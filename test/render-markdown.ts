import fs from 'fs';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { rendererMarkdownIt } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hexo = new Hexo(__dirname, { silent: true });
hexo.config.post_asset_folder = true;
hexo.config.root = '/hexo-themes/hexo-theme-flowbite/';
const r = rendererMarkdownIt(hexo);

async function main() {
  let result = r({ text: fs.readFileSync(__dirname + '/fixtures/sample.md', 'utf-8') } as StoreFunctionData);
  fs.writeFileSync(__dirname + '/fixtures/sample-result.html', result);
  console.log(__dirname + '/fixtures/sample-result.html');

  result = r({ text: fs.readFileSync(__dirname + '/fixtures/complete.md', 'utf-8') } as StoreFunctionData);
  fs.writeFileSync(__dirname + '/fixtures/complete-result.html', result);
  console.log(__dirname + '/fixtures/complete-result.html');
}

main();
