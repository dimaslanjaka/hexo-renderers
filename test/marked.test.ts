import { describe, expect } from '@jest/globals';
import Hexo from 'hexo';
import { rendererMarked } from '../src/renderer-marked';

describe('test renderer marked', () => {
  const hexo = new Hexo(__dirname, { silent: true });

  const defaultCfg = JSON.parse(
    JSON.stringify(
      Object.assign(hexo.config, {
        marked: {
          mangle: true
        }
      })
    )
  );

  before(async () => {
    hexo.config.permalink = ':title';
    await hexo.init();
  });

  beforeEach(() => {
    hexo.config = JSON.parse(JSON.stringify(defaultCfg));
  });

  const r = rendererMarked(hexo);

  it('render anchor with invalid html brackets', function () {
    const str = `- [This should escaped <x> <y>](https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but)`;
    const result = r({ text: str }, hexo.config.marked);
    expect(result.includes('&lt;x&gt')).toBeTruthy();
    expect(result.includes('&lt;y&gt')).toBeTruthy();
  });
});
