const path = require('path');
const Hexo = require('hexo');
const { rendererMarkdownIt } = require('../../dist/renderer-markdown-it.cjs');

describe('test render markdown-it', () => {
  const testDir = path.join(__dirname, '../test-site');
  const hexo = new Hexo(testDir, { silent: true });
  const renderer = rendererMarkdownIt(hexo);

  test('render anchor with invalid html brackets', () => {
    const str = `- [This should escaped <x> <y>](https://stackoverflow.com/questions/43900035/ts4023-exported-variable-x-has-or-is-using-name-y-from-external-module-but)`;
    const result = renderer({ text: str });
    console.log(result);
    expect(result.includes('&lt;x&gt')).toBe(true);
    expect(result.includes('&lt;y&gt')).toBe(true);
  });
});
