'use strict';

const fs = require('fs-extra');
const Hexo = require('hexo');
const path = require('path');

const rootDir = path.join(__dirname, 'hexo-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

const hexo = new Hexo(rootDir, { silent: false, debug: true });

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
    console.error('Error resolving or loading plugin:', error.message);
    return;
  }

  await hexo.scaffold.set('post', ['---', 'title: {{ title }}', 'date: {{ date }}', 'tags:', '---'].join('\n'));
  await hexo.scaffold.set('draft', ['---', 'title: {{ title }}', 'tags:', '---'].join('\n'));

  const defaultCfg = JSON.parse(JSON.stringify(hexo.config));
  hexo.config = JSON.parse(JSON.stringify(defaultCfg));

  const content = `
---
title: nunjucks in markdown
date: 2023-10-04T09:26:26+07:00
updated: 2023-10-04T09:26:26+07:00
---
## below is pretext

inline codeblock \`build-\${{ hashFiles('package-lock.json') }}\`

\`\`\`js
const varx = \`build-\${{ hashFiles('package-lock.json') }}\`
\`\`\`

\`\`\`ts
const xvar = \`build-\${{ hashFiles('package-lock.json') }}\`
\`\`\`

\`\`\`
const var = \`build-\${{ hashFiles('package-lock.json') }}\`
\`\`\`

## below is meta info

- published: {{ page.date }}
- modified: {{ page.updated }}
  `;

  try {
    const data = await hexo.post.render(null, {
      content,
      engine: 'markdown'
    });
    console.log(data.content.trim());
  } catch (error) {
    console.error('Error rendering post:', error.message);
  }
};

main();
