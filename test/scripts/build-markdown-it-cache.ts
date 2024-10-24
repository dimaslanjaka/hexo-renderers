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
      // engines: ['ejs', 'stylus', 'nunjucks', 'dartsass', 'pug', 'sass', 'markdown-it', 'rollup'],
      // engines: ['markdown-it'],
      generator: ['related-posts', 'meta'],
      html_tags: ['summary', 'details', 'detail']
    },
    markdown: {
      render: {
        cache: true
      }
    }
  });
  await spawnAsync('npm', ['run', 'build'], { cwd: rootDir, stdio: 'inherit' });
}

name();
