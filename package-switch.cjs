const fs = require('fs');
const pkg = require('./package.json');
const path = require('path');
const axios = require('axios').default;
try {
  require.resolve('dotenv'); // Check if dotenv is installed
  require('dotenv').config({ override: true }); // Load environment variables if installed
  console.log('dotenv loaded successfully');
} catch (_e) {
  console.log('dotenv is not installed, skipping loading .env file');
}

// node package-switch.cjs [local|production]

const local = {
  'sbg-api': 'file:../sbg-api/packages/sbg-api/release/sbg-api.tgz',
  'sbg-utility': 'file:../sbg-utility/packages/sbg-utility/release/sbg-utility.tgz',
  'sbg-server': 'file:../static-blog-generator/packages/sbg-server/release/sbg-server.tgz',
  'sbg-cli': 'file:../static-blog-generator/packages/sbg-cli/release/sbg-cli.tgz',
  'hexo-asset-link': 'file:../hexo/releases/hexo-asset-link.tgz',
  hexo: 'file:../hexo/releases/hexo.tgz',
  'hexo-cli': 'file:../hexo/releases/hexo-cli.tgz',
  'hexo-front-matter': 'file:../hexo/releases/hexo-front-matter.tgz',
  'hexo-log': 'file:../hexo/releases/hexo-log.tgz',
  'hexo-util': 'file:../hexo/releases/hexo-util.tgz',
  warehouse: 'file:../hexo/releases/warehouse.tgz',
  'git-command-helper': 'file:../git-command-helper/release/git-command-helper.tgz',
  'markdown-it': 'file:../markdown-it/release/markdown-it.tgz',
  'hexo-renderers': 'file:../hexo-renderers/release/hexo-renderers.tgz',
  'hexo-shortcodes': 'file:../hexo-shortcodes/release/hexo-shortcodes.tgz',
  'hexo-seo': 'file:../hexo-seo/release/hexo-seo.tgz'
};

const production = {
  hexo: 'https://github.com/dimaslanjaka/hexo/raw/fc1f9b7/releases/hexo.tgz',
  '@types/hexo': 'https://github.com/dimaslanjaka/hexo/raw/fc1f9b7/releases/hexo.tgz',
  '@types/hexo-log': 'https://github.com/dimaslanjaka/hexo/raw/fc1f9b7/releases/hexo-log.tgz',
  'hexo-util': 'https://github.com/dimaslanjaka/hexo/raw/fc1f9b7/releases/hexo-util.tgz'
};

/**
 * Fetches the latest commit from a specified GitHub repository and branch.
 *
 * @param {string} repoOwner - The owner of the repository.
 * @param {string} repoName - The name of the repository.
 * @param {string|null|undefined} [branch] - The branch to fetch the latest commit from (default is 'pre-release').
 * @returns {Promise<Record<string, any>|null>} - The latest commit object or null if an error occurs.
 */
async function getLatestCommit(repoOwner, repoName, branch = '') {
  const githubToken = process.env.ACCESS_TOKEN || process.env.GH_TOKEN;
  let url;
  if (typeof branch === 'string' && branch.length > 0) {
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
          Accept: 'application/vnd.github.v3+json'
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
    // if (branch === "pre-release") return getLatestCommit(repoOwner, repoName, null);
    console.error('Error fetching the latest commit:', repoOwner, repoName, branch, error.message);
    return null;
  }
}

/**
 * Fetches the latest commit SHA and updates the production URL for the specified repository.
 * @param {string} repoOwner - The owner of the repository.
 * @param {string} repoName - The name of the repository.
 * @param {string} branch - The branch to fetch from.
 * @param {string} packageName - The name of the package in production.
 * @param {string} urlFormat - Custom URL format for the .tgz file.
 */
async function updatePackageSha(repoOwner, repoName, branch, packageName, urlFormat) {
  try {
    const { sha } = (await getLatestCommit(repoOwner, repoName, branch)) || {};
    if (sha) {
      const url = urlFormat.replace('{sha}', sha);

      const res = await axios.get(url, { maxRedirects: 10 });
      if (res.status === 200) {
        if (res.headers['content-type'] === 'application/octet-stream') {
          production[packageName] = url;
        } else {
          console.error(
            `Error updating package SHA for ${packageName}: Unexpected content-type "${res.headers['content-type']}" at ${url}`
          );
        }
      }
    }
  } catch (error) {
    const errorUrl = error.config?.url;
    const message = error.response?.data?.message || error.message;
    console.error(`Error updating package SHA for ${packageName}:`, message, errorUrl);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('local')) {
    pkg.resolutions = Object.assign(production, local);
  } else {
    // Update specific packages with their latest commit SHA
    await updatePackageSha(
      'dimaslanjaka',
      'markdown-it',
      'master',
      'markdown-it',
      'https://github.com/dimaslanjaka/markdown-it/raw/{sha}/release/markdown-it.tgz'
    );
    await updatePackageSha(
      'dimaslanjaka',
      'static-blog-generator',
      'sbg-api',
      'sbg-api',
      'https://github.com/dimaslanjaka/static-blog-generator/raw/{sha}/packages/sbg-api/release/sbg-api.tgz'
    );
    await updatePackageSha(
      'dimaslanjaka',
      'static-blog-generator',
      'sbg-utility',
      'sbg-utility',
      'https://github.com/dimaslanjaka/static-blog-generator/raw/{sha}/packages/sbg-utility/release/sbg-utility.tgz'
    );
    await updatePackageSha(
      'dimaslanjaka',
      'static-blog-generator',
      'master',
      'sbg-cli',
      'https://github.com/dimaslanjaka/static-blog-generator/raw/{sha}/packages/sbg-cli/release/sbg-cli.tgz'
    );

    pkg.resolutions = production;
  }

  pkg.resolutions = Object.fromEntries(
    Object.entries(pkg.resolutions).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
  );
  pkg.overrides = pkg.resolutions;

  fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
}

main();
