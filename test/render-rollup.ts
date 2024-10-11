import fs from 'fs';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import renderer from '../src/renderer/rollup/renderer';

const hexo = new Hexo(__dirname, { silent: true });
const config = {
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'hexoRollup'
  }
} as any;
renderer
  .bind(hexo)(
    {
      text: fs.readFileSync(__dirname + '/fixtures/rollup-sample.js', 'utf-8')
    } as StoreFunctionData,
    config
  )
  .then((result) => {
    if (result) fs.writeFileSync(__dirname + '/tmp/sample-result.js', result);
    console.log(result);
  });
