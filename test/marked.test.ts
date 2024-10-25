import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import fs from 'fs-extra';
import Hexo from 'hexo';
import { fileURLToPath } from 'node:url';
import path from 'path';
import { htmlFixer } from '../src/fixer/html';
import { rendererMarkedNew } from '../src/index-exports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, 'test-site');
fs.ensureDirSync(path.join(rootDir, 'tmp'));

jest.setTimeout(60000);

describe('test renderer marked', () => {
  const hexo = new Hexo(rootDir, { silent: true });

  const defaultCfg = JSON.parse(
    JSON.stringify(
      Object.assign(hexo.config, {
        marked: {
          mangle: true
        }
      })
    )
  );

  beforeAll(async () => {
    hexo.config.permalink = ':title';
    await hexo.init();
  });

  beforeEach(() => {
    hexo.config = JSON.parse(JSON.stringify(defaultCfg));
  });

  /**
   * reload renderer with different hexo config
   * @param config custom hexo config
   * @returns
   */
  const reloadRenderer = (config: Record<string, any> = {}) => {
    hexo.config = Object.assign(hexo.config, config || {});
    return rendererMarkedNew.bind(hexo);
  };

  it('render anchor with invalid html brackets', async function () {
    const str = `- [This should escaped <x> <y>](https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but)`;
    const r = reloadRenderer({
      renderers: {
        fix: {
          html: true
        }
      }
    });
    const data = { text: str };
    let result = r(data, hexo.config.marked);
    result = htmlFixer.call(hexo, result, data);
    console.log(result);
    expect(result.includes('&lt;x&gt')).toBeTruthy();
    expect(result.includes('&lt;y&gt')).toBeTruthy();
  });
});
