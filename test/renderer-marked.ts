import fs from 'fs-extra';
import Hexo from 'hexo';
import MarkdownIt from 'markdown-it';
import path from 'path';
import { writefile } from 'sbg-utility';
import { fileURLToPath } from 'url';
import { htmlFixer } from '../src/index-exports';
import rendererMarked from '../src/marked/renderer-new';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, 'test-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

const hexo = new Hexo(rootDir, { silent: false });
hexo.extend.filter.register('markdown-it:renderer', (md: any) => {
  (md as MarkdownIt).validateLink = function () {
    return true;
  };
});
hexo.config.post_asset_folder = true;
hexo.config.root = '/hexo-themes/hexo-theme-flowbite/';
hexo.config.renderers = {
  engines: ['marked'],
  fix: {
    html: true,
    cache: false
  }
};
hexo.config.marked = {
  gfm: true,
  pedantic: false,
  breaks: true,
  smartLists: true,
  smartypants: true,
  modifyAnchors: 0,
  autolink: true,
  mangle: true,
  sanitizeUrl: false,
  dompurify: false,
  headerIds: true,
  anchorAlias: false,
  lazyload: false,
  prependRoot: true,
  postAsset: false,
  external_link: {
    enable: false,
    exclude: [],
    nofollow: false
  },
  descriptionLists: true,
  cache: false
};
const r = rendererMarked.bind(hexo);

const render = (text: string) => {
  const result = r({ text }, hexo.config.marked);
  return htmlFixer.call(hexo, result, { text });
};

function sample() {
  const body = `
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

# Hello world

\`\`\`
console.log("Hello world");
\`\`\`

## Hello world

hello

## Links

- [link text](http://dev.nodeca.com)

- [link with title](http://nodeca.github.io/pica/demo/ "title text!")

- Autoconverted link https://github.com/nodeca/pica

- [This should escaped <x> <y>](https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but)
`.trim();
  const result = render(body);
  console.log(writefile(rootDir + '/tmp/sample.html', result).file);
}

function main() {
  const result = render(fs.readFileSync(rootDir + '/source/_posts/sample.md', 'utf-8'));
  console.log(writefile(rootDir + '/tmp/sample2.html', result).file);

  sample();
}

main();
