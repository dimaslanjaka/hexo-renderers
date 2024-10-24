import fs from 'fs';
import Hexo from 'hexo';
import path from 'path';
import { fileURLToPath } from 'url';
import renderer from '../src/renderer-pug';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, 'test-site');

const hexo = new Hexo(rootDir, { silent: true });
const result = renderer(hexo)(
  {
    text: fs.readFileSync(__dirname + '/fixtures/hello.pug', 'utf-8')
  },
  {
    name: 'Hexo'
  }
);

console.log(result);
