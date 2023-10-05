import fs from 'fs';
import Hexo from 'hexo';

const hexo = new Hexo(__dirname, { silent: true });
const defaultCfg = JSON.parse(
  JSON.stringify(
    Object.assign(hexo.config, {
      marked: {}
    })
  )
);
hexo.config.permalink = ':title';
hexo.config = JSON.parse(JSON.stringify(defaultCfg));

hexo
  .init()
  .then(() => {
    return hexo.loadPlugin(require.resolve(__dirname + '/../dist/index.js'));
  })
  .then(() => {
    hexo.post
      .render(null as any, {
        content: fs.readFileSync(__dirname + '/fixtures/sample.md', 'utf-8'),
        // disableNunjucks: true,
        engine: 'md'
      })
      .then(console.log);
  });
