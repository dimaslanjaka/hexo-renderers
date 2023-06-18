const Hexo = require('hexo');
const path = require('path');
const Axios = require('axios');
const fs = require('fs-extra');
const axios = Axios.default;
const rootDir = path.join(__dirname, 'test');
//const { spawn } = require('git-command-helper');
// override current working directory
process.cwd = () => rootDir;

const hexo = new Hexo(rootDir);

async function serverStart() {
  // await spawn('yarn', ['workspace', 'hexo', 'run', 'build']);
  await hexo.init();
  await hexo.call('clean');
  await hexo.call('server');
  await axios.get('http://localhost:4000/docs/hexo-renderers/nunjucks');
  await axios.get('http://localhost:4000/docs/hexo-renderers/css/bootstrap.css');
  await axios.get('http://localhost:4000/docs/hexo-renderers/css/material.css');
  await axios.get('http://localhost:4000/docs/hexo-renderers/js/material.js');
  return hexo;
}

const doCopy = () =>
  Promise.resolve(require('./test/_config.loader')(path.join(__dirname, 'test'), { theme: 'butterfly' }));

// listen custom layout
fs.watch(path.join(__dirname, 'test/views'), (eventType, filename) => {
  // could be either 'rename' or 'change'. new file event and delete
  // also generally emit 'rename'
  console.log(eventType, filename);
  // do copy
  doCopy();
});

// start server
doCopy().then(() => serverStart());
