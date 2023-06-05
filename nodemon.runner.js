const Hexo = require('hexo');
const path = require('path');
const rootDir = path.join(__dirname, 'test');
// override current working directory
process.cwd = () => rootDir;

const hexo = new Hexo(rootDir);
(async function () {
  await hexo.init();
  await hexo.call('clean');
  await hexo.call('server');
})();
