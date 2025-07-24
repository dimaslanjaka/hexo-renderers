import { describe, expect, test } from '@jest/globals';
import Hexo from 'hexo';
import path from 'path';
import { fileURLToPath } from 'url';
import { rendererMarkdownIt } from '../../src/renderer-markdown-it';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
