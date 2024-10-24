import fs from 'fs-extra';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import MarkdownIt from 'markdown-it';
import path from 'path';
import { fileURLToPath } from 'url';
import { rendererMarkdownIt } from '../src/renderer-markdown-it';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, 'test-site');
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
const r = rendererMarkdownIt(hexo);

function main() {
  let result = r({ text: fs.readFileSync(rootDir + '/source/_posts/sample.md', 'utf-8') } as StoreFunctionData);
  fs.writeFileSync(rootDir + '/tmp/sample.html', result);
  console.log(rootDir + '/tmp/sample.html');

  result = r({ text: fs.readFileSync(rootDir + '/source/_posts/complete.md', 'utf-8') } as StoreFunctionData);
  fs.writeFileSync(rootDir + '/tmp/complete.html', result);
  console.log(rootDir + '/tmp/complete.html');
}

main();
