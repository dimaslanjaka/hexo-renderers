import { spawnAsync } from 'cross-spawn';
import fs from 'fs-extra';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { reloadHexoConfigYml } from './loader.cjs';
const require = createRequire(import.meta.url);

global.require = require; // this will make require at the global scobe and treat it like the original require

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../test-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

async function name() {
  reloadHexoConfigYml(rootDir, {
    renderers: {
      engines: ['marked', 'nunjucks', 'ejs', 'pug'],
      generator: ['related-posts', 'meta'],
      html_tags: ['summary', 'details', 'detail']
    },
    marked: {
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
      descriptionLists: true
    }
  });
  await spawnAsync('hexo', ['generate'], { cwd: rootDir, stdio: 'inherit' });
}

name();
