const Hexo = require('hexo');
const renderer = require('../dist/renderer-pug');

const hexo = new Hexo(__dirname, { silent: true });
const result = renderer.rendererPug(hexo)(
  {
    text: 'p Hello #{name}'
  },
  {
    name: 'Hexo'
  }
);

console.log(result);
