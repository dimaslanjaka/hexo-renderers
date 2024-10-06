import fs from 'fs';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import renderer from '../src/renderer-stylus';

const hexo = new Hexo(__dirname, { silent: true });

const defaultCfg = JSON.parse(
  JSON.stringify(
    Object.assign(hexo.config, {
      stylus: {
        compress: false
      }
    })
  )
);
const themeCfg = JSON.parse(
  JSON.stringify(
    Object.assign(hexo.theme.config, {
      foo: 1,
      bar: {
        baz: 2
      },
      nil: null,
      obj: {
        arr: [1, 2, 3]
      }
    })
  )
);
hexo.config = JSON.parse(JSON.stringify(defaultCfg));
hexo.theme.config = JSON.parse(JSON.stringify(themeCfg));
const data = { text: fs.readFileSync(__dirname + '/fixtures/style.styl', 'utf-8') } as StoreFunctionData;

const r = renderer.stylusFn.bind(hexo);
r(data, {}, (err, result) => {
  console.log(result);
});
