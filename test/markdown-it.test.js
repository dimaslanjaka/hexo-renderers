const Hexo = require('hexo');
const { describe, it } = require('mocha');
const { rendererMarkdownIt } = require('../dist');

describe('test render markdown-it', async () => {
  const hexo = new Hexo(__dirname, { silent: true });
  const r = rendererMarkdownIt(hexo);
  const { assert } = await import('chai');

  it('render anchor with invalid html brackets', () => {
    const str = `- [This should escaped <x> <y>](https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but)`;
    const result = r({ text: str });
    assert.isTrue(result.includes('&lt;x&gt'));
    assert.isTrue(result.includes('&lt;y&gt'));
  });
});
