import fs from 'fs-extra';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import MarkdownIt from 'markdown-it/dist/lib/index.mjs';
import path from 'upath';
import { fileURLToPath } from 'url';
import rendererMarkdownIt from '../src/renderer-markdown-it.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, 'hexo-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

const hexo = new Hexo(rootDir, { silent: true });
hexo.extend.filter.register('markdown-it:renderer', (md: any) => {
  (md as MarkdownIt).validateLink = function () {
    return true;
  };
});
hexo.config.post_asset_folder = true;
hexo.config.root = '/hexo-themes/hexo-theme-flowbite/';
if (!hexo.config.markdown) hexo.config.markdown = {};
hexo.config.markdown.plugins = [
  'markdown-it-abbr',
  'markdown-it-footnote',
  'markdown-it-ins',
  'markdown-it-sub',
  'markdown-it-sup',
  'markdown-it-deflist'
];

async function presetCommonMark() {
  hexo.config.markdown.preset = 'commonmark';
  const render = rendererMarkdownIt(hexo);
  const result = render({ text: fs.readFileSync(rootDir + '/source/_posts/default.md', 'utf-8') } as StoreFunctionData);
  const output = path.join(rootDir, '/tmp/commonMark.html');
  fs.writeFileSync(output, result);
  console.log(output);
}

async function presetDefault() {
  hexo.config.markdown.preset = 'default';
  const render = rendererMarkdownIt(hexo);
  const result = render({
    text: fs.readFileSync(rootDir + '/source/_posts/markdown-it-demo.md', 'utf-8')
  } as StoreFunctionData);
  const output = path.join(rootDir, '/tmp/default.html');
  fs.writeFileSync(output, result);
  console.log(output);
}

async function langPrefix() {
  hexo.config.markdown.render = {
    langPrefix: 'lang-'
  };
  const text = '```js\nexample\n```';
  const render = rendererMarkdownIt(hexo);
  const result = render({ text } as StoreFunctionData);
  const output = path.join(rootDir, '/tmp/lang-prefix.html');
  fs.writeFileSync(output, result);
  console.log(output);
}

async function main() {
  await presetCommonMark();
  await presetDefault();
  await langPrefix();
  await hexo.exit();
}

main();
