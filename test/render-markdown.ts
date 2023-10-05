import renderer from '../src/renderer-markdown-it';
import Hexo from 'hexo';
import fs from 'fs';

const hexo = new Hexo(__dirname, { silent: true });
const r = renderer(hexo);

const result = r({ text: fs.readFileSync(__dirname + '/fixtures/sample.md', 'utf-8') });
console.log(result);
