const ansiColors = require("ansi-colors");
const axios = require("axios");
const { spawn } = require("cross-spawn");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ override: true });

const githubToken = process.env.ACCESS_TOKEN || process.env.GH_TOKEN;

/**
 * @type {import('./package.json')}
 */
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8"));
if (!pkg.dependencies) pkg.dependencies = {};
if (!pkg.devDependencies) pkg.devDependencies = {};
if (!pkg.resolutions) pkg.resolutions = {};
if (!pkg.overrides) pkg.overrides = {};

/**
 * Extracts the GitHub repository URL and its components from a given string.
 *
 * @param {string} input - The input string containing the GitHub URL.
 * @returns {{ url: string|null, user: string|null, repo: string|null }} - The extracted components.
 */
const extractRepositoryUrl = (input) => {
  const regex = /(https:\/\/github\.com\/([\w-]+)\/([\w-]+))/;
  const match = input.match(regex);
  return {
    url: match ? match[0] : null,
    user: match ? match[2] : null,
    repo: match ? match[3] : null
  };
};

/**
 * Fetches the latest commit from a specified GitHub repository and branch.
 *
 * @param {string} repoOwner - The owner of the repository.
 * @param {string} repoName - The name of the repository.
 * @param {string|null|undefined} [branch='pre-release'] - The branch to fetch the latest commit from (default is 'pre-release').
 * @returns {Promise<Record<string, any>|null>} - The latest commit object or null if an error occurs.
 */
async function getLatestCommit(repoOwner, repoName, branch = "pre-release") {
  let url;
  if (typeof branch === "string" && branch.length > 0) {
    url = `https://api.github.com/repos/${repoOwner}/${repoName}/commits/${branch}`;
  } else {
    url = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;
  }

  try {
    /**
     * @type {import("axios").AxiosResponse<any, any>}
     */
    let response;
    if (githubToken) {
      response = await axios.get(url, {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json"
        }
      });
    } else {
      response = await axios.get(url);
    }
    const latestCommit = response.data; // The latest commit for the specified branch
    if (!Array.isArray(latestCommit)) {
      return latestCommit;
    } else {
      return latestCommit[0];
    }
  } catch (error) {
    // retry fetch default branch
    if (branch === "pre-release") return getLatestCommit(repoOwner, repoName, null);
    console.error("Error fetching the latest commit:", repoOwner, repoName, branch, error.message);
    return null;
  }
}

/**
 * Processes a package version to determine if it needs updating.
 *
 * @param {string} packageName - The name of the package.
 * @param {string} version - The current version of the package.
 * @returns {Promise<{ packageName: string, needUpdate: boolean, updateVersion: string }|null>} - An object indicating if an update is needed.
 */
async function processPkg(packageName, version) {
  if (/^((file|github):|(git|ssh)\+|https?)/i.test(version)) {
    if (/^https?:\/\/github.com/.test(version) && version.includes("/release/") && version.includes(".tgz")) {
      const { repo, user, url: _url } = extractRepositoryUrl(version);
      if (repo && user) {
        let updateVersion = null;
        const latestCommit = await getLatestCommit(user, repo);
        if (latestCommit) {
          const coloredVersion = version.replace(/\/raw\/(\w+)\//, `/raw/${ansiColors.redBright("$1")}/`);
          const { sha = null } = latestCommit;
          let needUpdate = typeof sha === "string";
          if (sha) {
            updateVersion = version.replace(/\/raw\/(\w+)\//, `/raw/${sha}/`);
            /**
             * @type {import("axios").AxiosResponse<any, any>}
             */
            let response;
            if (githubToken) {
              response = await axios
                .get(updateVersion, {
                  headers: {
                    Authorization: `token ${githubToken}`,
                    Accept: "application/vnd.github.v3+json"
                  }
                })
                .catch(() => {
                  return { status: 404 };
                });
            } else {
              response = await axios.get(updateVersion).catch((e) => {
                return { status: 404, message: e.message };
              });
            }
            const isSame = version.trim() == updateVersion.trim();
            needUpdate = needUpdate && !isSame && response.status === 200;
            if (!isSame) {
              console.log(
                ansiColors.magentaBright(packageName),
                coloredVersion,
                "->",
                updateVersion.replace(sha, ansiColors.green(sha)),
                needUpdate ? ansiColors.greenBright("updating...") : ansiColors.yellowBright("keep")
              );
            } else {
              console.log(ansiColors.magentaBright(packageName), coloredVersion, ansiColors.yellowBright("keep"));
            }
          } else {
            console.log(
              ansiColors.magentaBright(packageName),
              coloredVersion,
              ansiColors.redBright("fail fetch update")
            );
          }
          return {
            packageName,
            needUpdate,
            updateVersion
          };
        }
      }
    }
  }
}

/**
 * Main function to process all packages and check for updates.
 *
 * @returns {Promise<void>}
 */
async function deps() {
  const keys = [...new Set([...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})])];
  for (let i = 0; i < keys.length; i++) {
    const packageName = keys[i];
    if (packageName in pkg.dependencies || packageName in pkg.devDependencies) {
      const version = pkg.dependencies[packageName] || pkg.devDependencies[packageName];
      const { needUpdate = false, updateVersion = null } = (await processPkg(packageName, version)) || {};
      if (needUpdate && updateVersion) {
        await new Promise((resolve, reject) => {
          const child = spawn("yarn", ["up", `${packageName}@${updateVersion}`], {
            cwd: process.cwd(),
            stdio: "inherit"
          });
          child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`Exited with code ${code}`))));
        });
      }
    }
  }
}

async function resolutions() {
  const keys = [...new Set([...Object.keys(pkg.resolutions || {}), ...Object.keys(pkg.overrides || {})])];
  for (let i = 0; i < keys.length; i++) {
    const packageName = keys[i];
    if (packageName in pkg.resolutions || packageName in pkg.overrides) {
      const version = pkg.resolutions[packageName] || pkg.overrides[packageName];
      const { needUpdate = false, updateVersion = null } = (await processPkg(packageName, version)) || {};
      if (needUpdate && updateVersion) {
        if (pkg.resolutions[packageName]) {
          pkg.resolutions[packageName] = updateVersion;
        } else if (pkg.overrides[packageName]) {
          pkg.overrides[packageName] = updateVersion;
        }
      }
    }
  }
  fs.writeFileSync(path.join(__dirname, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
}

deps()
  .then(resolutions)
  .catch((error) => console.error("Error in main:", error));
