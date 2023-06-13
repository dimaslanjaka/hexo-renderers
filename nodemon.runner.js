const Hexo = require('hexo');
const path = require('path');
const Axios = require('axios');
const axios = Axios.default;
const rootDir = path.join(__dirname, 'test');
//const { spawn } = require('git-command-helper');
// override current working directory
process.cwd = () => rootDir;

const hexo = new Hexo(rootDir);
(async function () {
  // await spawn('yarn', ['workspace', 'hexo', 'run', 'build']);
  await hexo.init();
  await hexo.call('clean');
  await hexo.call('server');
  await axios.get('http://localhost:4000/docs/hexo-renderers/nunjucks');
  await axios.get('http://localhost:4000/docs/hexo-renderers/css/bootstrap.css');
  await axios.get('http://localhost:4000/docs/hexo-renderers/css/material.css');
  await axios.get('http://localhost:4000/docs/hexo-renderers/js/material.js');
})();
