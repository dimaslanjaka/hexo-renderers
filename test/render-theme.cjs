'use strict';

const fs = require('fs-extra');
const Hexo = require('hexo');
const path = require('path');

const rootDir = path.join(__dirname, 'test-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

const hexo = new Hexo(rootDir, { silent: false, debug: true, safe: true });

const main = async () => {
  await hexo.init();
  // await hexo.load();

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

  const { compile } = Object.assign({}, hexo.extend.renderer.store.njk);
  // Setup layout
  const view = new hexo.theme.View(
    'test.njk',
    `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple SVG Path</title>
</head>
<body>
    <a href="#"><svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <path d="M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10" fill="none" stroke="blue" stroke-width="2"/>
    </svg></a>
    {{ content }}
</body>
</html>
    `.trim()
  );
  // Restore compile function
  hexo.extend.renderer.store.njk.compile = compile;
  // render post path
  const postPath = path.join(__dirname, 'test-site/source/markdown-it/math.md');
  const renderData = await hexo.post.render(postPath, {
    content: fs.readFileSync(postPath, 'utf-8'),
    engine: 'markdown'
  });
  // const body = ['layout: test', '---', '', content].join('\n');
  const result = await view.render({
    ...renderData,
    config: hexo.config,
    page: {}
  });
  console.log(result);
  await hexo.exit();
};

main();
