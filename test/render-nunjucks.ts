import fs from 'fs-extra';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import path from 'path';
import { fileURLToPath } from 'url';
import { rendererNunjucks } from '../src/renderer-nunjucks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, 'test-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

const hexo = new Hexo(rootDir, { silent: true });
const r = rendererNunjucks(hexo);

const context = {
  name: 'world'
};
const result = r.render(
  { text: fs.readFileSync(__dirname + '/fixtures/hello.njk', 'utf-8') } as StoreFunctionData,
  context
);
// fs.writeFileSync(__dirname + '/fixtures/sample-result.html', result);
console.log(result);

const result2 = r.compile({ text: fs.readFileSync(__dirname + '/fixtures/hello.njk', 'utf-8') })(context);
console.log(result2);
