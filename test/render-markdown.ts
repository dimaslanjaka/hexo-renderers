import renderer from '../src/renderer-markdown-it';
import Hexo from 'hexo';

const hexo = new Hexo(__dirname, { silent: true });
const r = renderer(hexo);

const code = 'console.log("Hello world");';
const body = ['# Hello world', '', '```', code, '```', '', '## Hello world', '', 'hello'].join('\n');
const result = r({ text: body });
console.log(result);
