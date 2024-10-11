'use strict';

const fs = require('fs-extra');
const Hexo = require('hexo');
const path = require('path');

const rootDir = path.join(__dirname, 'test-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

const hexo = new Hexo(rootDir, { silent: false, debug: true, safe: true });

const main = async () => {
  await hexo.init();

  // Debugging: log resolved plugin path
  const pluginPath = path.join(__dirname, '../dist/index.cjs');
  console.log('Resolved plugin path:', pluginPath);

  try {
    const resolvedPluginPath = require.resolve(pluginPath);
    console.log('Resolved full plugin path:', resolvedPluginPath);

    if (!resolvedPluginPath) {
      throw new Error('Plugin file not found or could not be resolved.');
    }

    await hexo.loadPlugin(resolvedPluginPath);
  } catch (error) {
    console.error('Error resolving or loading plugin:', error);
    return;
  }

  const markdownfile = path.join(__dirname, 'test-site/source/markdown-it/math.md');
  try {
    await hexo.post.render(markdownfile, {
      content: fs.readFileSync(markdownfile, 'utf-8'),
      engine: 'markdown'
    });
  } catch (error) {
    console.error('Error rendering post:', error.message);
  }

  await hexo.exit();
};

main();
