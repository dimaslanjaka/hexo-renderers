const Hexo = require('hexo');
const path = require('path');
const Axios = require('axios');
const axios = Axios.default;
const rootDir = path.join(__dirname, 'test');
// override current working directory
process.cwd = () => rootDir;

const hexo = new Hexo(rootDir);
(async function () {
  await hexo.init();
  // await hexo.call('clean');
  await hexo.call('server');
  axios.get('http://localhost:4000/docs/hexo-renderers/nunjucks');
})();
