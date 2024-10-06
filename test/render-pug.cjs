const Hexo = require('hexo');
const renderer = require('../dist/renderer-pug');
const fs = require('fs');

const hexo = new Hexo(__dirname, { silent: true });
const result = renderer.rendererPug(hexo)(
  {
    text: fs.readFileSync(__dirname + '/fixtures/hello.pug', 'utf-8')
  },
  {
    name: 'Hexo'
  }
);

console.log(result);
