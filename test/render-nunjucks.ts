import fs from 'fs';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import renderer from '../src/renderer-nunjucks';

const hexo = new Hexo(__dirname, { silent: true });
const r = renderer.rendererNunjucks(hexo);

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
