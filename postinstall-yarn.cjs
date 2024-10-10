const ansiColors = require('ansi-colors');
const axios = require('axios');
const { spawn } = require('cross-spawn');
const fs = require('fs');
const path = require('path');

/**
 * @type {import('./package.json')}
 */
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));

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
 * Fetches the latest commit from a specified GitHub repository.
 *
 * @param {string} repoOwner - The owner of the repository.
 * @param {string} repoName - The name of the repository.
 * @returns {Promise<Object|null>} - The latest commit object or null if an error occurs.
 */
async function getLatestCommit(repoOwner, repoName) {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/commits`;

  try {
    const response = await axios.get(url);
    const latestCommit = response.data[0]; // The latest commit is the first in the array
    return latestCommit;
  } catch (error) {
    console.error('Error fetching the latest commit:', error);
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
    if (/^https?:\/\/github.com/.test(version) && version.includes('/release/') && version.includes('.tgz')) {
      const { repo, user, url: _url } = extractRepositoryUrl(version);
      if (repo && user) {
        const latestCommit = await getLatestCommit(user, repo);
        if (latestCommit) {
          const { sha } = latestCommit;
          const coloredVersion = version.replace(
            /raw\/(.*?)\/release\//,
            (match, p1) => `raw/${ansiColors.red(p1)}/release/`
          );
          const updateVersion = version.replace(/raw\/(.*)\/release\//, `raw/${sha}/release/`);
          const needUpdate = version !== updateVersion;
          console.log(
            ansiColors.magentaBright(packageName),
            coloredVersion,
            '->',
            updateVersion.replace(sha, ansiColors.green(sha)),
            needUpdate ? ansiColors.greenBright('updating...') : ansiColors.yellowBright('keep')
          );
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
async function main() {
  const keys = Object.keys(pkg.dependencies).concat(Object.keys(pkg.devDependencies)).flat();
  for (let i = 0; i < keys.length; i++) {
    const packageName = keys[i];
    if (packageName in pkg.dependencies || packageName in pkg.devDependencies) {
      const version = pkg.dependencies[packageName] || pkg.devDependencies[packageName];
      const { needUpdate = false, updateVersion } = (await processPkg(packageName, version)) || {};
      if (needUpdate) {
        await new Promise((resolve, reject) => {
          const child = spawn('yarn', ['up', `${packageName}@${updateVersion}`], {
            cwd: process.cwd(),
            stdio: 'inherit'
          });
          child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`Exited with code ${code}`))));
        });
      }
    }
  }
}

main().catch((error) => console.error('Error in main:', error));
