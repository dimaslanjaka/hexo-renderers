const path = require('path');
const nunjucks = require('nunjucks');
const fs = require('fs-extra');
const axios = require('axios');
const githubToken = process.env.ACCESS_TOKEN || process.env.GH_TOKEN;

/**
 * Fetches the latest commit hash from the master branch of a GitHub repository
 * and returns the tarball URL.
 * @returns {Promise<string>} - A promise that resolves to the tarball URL.
 */
async function markdownItTgz() {
  const owner = 'dimaslanjaka';
  const repo = 'markdown-it';

  try {
    const headers = { 'User-Agent': 'axios' };

    // Add authorization and Accept headers if token is available
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
      headers['Accept'] = 'application/vnd.github.v3+json';
    }

    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits/master`, { headers });
    const hash = response.data.sha;
    const tarball = `https://github.com/${owner}/${repo}/raw/${hash}/release/markdown-it.tgz`;

    return tarball;
  } catch (error) {
    const status = error.response?.status;
    const statusText = error.response?.statusText || error.message;
    const finalUrl = error.config.url; // Get the final URL from the error config
    console.error(`Error ${status}: ${statusText} at URL: ${finalUrl}`);
  }
}

async function main() {
  // Configure Nunjucks to use the "views" directory for templates
  nunjucks.configure(path.join(__dirname, 'docs'), {
    autoescape: true, // Automatically escape output
    noCache: true // Disable template caching (optional)
  });

  const markdown_it_tarball = await markdownItTgz();
  const result = nunjucks.render('readme.md', { markdown_it_tarball });
  await fs.writeFile(path.join(__dirname, 'readme.md'), result);
}

main();
