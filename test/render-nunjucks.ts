import fs from 'fs';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { rendererNunjucks } from '../src/renderer-nunjucks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hexo = new Hexo(__dirname, { silent: true });
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
