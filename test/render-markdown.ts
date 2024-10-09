import fs from 'fs';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import rendererMarkdownIt from '../src/renderer-markdown-it';

const hexo = new Hexo(__dirname, { silent: true });
const r = rendererMarkdownIt(hexo);

async function main() {
  const result = r({ text: fs.readFileSync(__dirname + '/fixtures/sample.md', 'utf-8') } as StoreFunctionData);
  fs.writeFileSync(__dirname + '/fixtures/sample-result.html', result);
  console.log(__dirname + '/fixtures/sample-result.html');
}

main();
