const gch = require('git-command-helper');
const path = require('path');
const nunjucks = require('nunjucks');
const fs = require('fs-extra');
const pkg = require('./package.json');

async function markdownItTgz() {
  const markdownItGh = new gch.gitCommandHelper(path.join(__dirname, 'packages/markdown-it'), 'master');
  const hash = await markdownItGh.latestCommit('release/markdown-it.tgz', { short: false });
  const tarball = `https://github.com/dimaslanjaka/markdown-it/raw/${hash}/release/markdown-it.tgz`;
  return tarball;
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
  // update dependencies to latest tarball
  pkg.dependencies['markdown-it'] = markdown_it_tarball;
  pkg.resolutions['markdown-it'] = markdown_it_tarball;
  pkg.overrides['markdown-it'] = markdown_it_tarball;
  fs.writeFileSync(path.resolve(__dirname, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
}

main();
