import fs from 'fs-extra';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import path from 'path';
import { fileURLToPath } from 'url';
import rendererMarkdownIt from '../src/renderer-markdown-it.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, 'hexo-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

const hexo = new Hexo(rootDir, { silent: true });
hexo.config.post_asset_folder = true;
hexo.config.root = '/hexo-themes/hexo-theme-flowbite/';
const r = rendererMarkdownIt(hexo);

async function main() {
  let result = r({ text: fs.readFileSync(rootDir + '/source/_posts/sample.md', 'utf-8') } as StoreFunctionData);
  fs.writeFileSync(rootDir + '/tmp/sample-result.html', result);
  console.log(rootDir + '/tmp/sample-result.html');

  result = r({ text: fs.readFileSync(rootDir + '/source/_posts/complete.md', 'utf-8') } as StoreFunctionData);
  fs.writeFileSync(rootDir + '/tmp/complete-result.html', result);
  console.log(rootDir + '/tmp/complete-result.html');
}

main();
