import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import sass from 'sass';
import { fileURLToPath } from 'url';
import { rendererSass } from '../src/renderer-sass';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('rendererSass', () => {
  let hexo: any;
  let registered: Record<string, any>;

  beforeEach(() => {
    registered = {} as Record<string, any>;
    hexo = {
      base_dir: '/base',
      theme_dir: '/theme',
      config: {},
      theme: { config: {} },
      extend: {
        renderer: {
          register: jest.fn((ext: string, out: any, fn: any) => {
            registered[ext] = fn;
          })
        }
      }
    };
    (global as any).hexo = hexo; // Mock global hexo for testing
  });

  it('registers both scss and sass renderers', () => {
    rendererSass(hexo);
    expect(registered['scss']).toBeInstanceOf(Function);
    expect(registered['sass']).toBeInstanceOf(Function);
  });

  it('renders scss to css (mocked)', async () => {
    rendererSass(hexo);
    // Dart Sass default output for expanded style (ensure trailing newline)
    const expandedCss = Buffer.from('body {\n  color: red;\n}\n');
    jest.spyOn(sass, 'renderSync').mockReturnValue({ css: expandedCss } as any);
    const fn = registered['scss'];
    const result = await fn.call(hexo, { text: 'body { color: red; }', path: 'test.scss' });
    // Compare after trimming trailing whitespace for robustness
    expect(String(result).trim()).toBe('body {\n  color: red;\n}');
  });

  it('renders real scss file to css', async () => {
    rendererSass(hexo);
    const scss = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample.scss'), 'utf8');
    // Use real sass.renderSync for this test
    const fn = registered['scss'];
    const result = await fn.call(hexo, { text: scss, path: 'sample.scss' });
    expect(typeof result).toBe('string');
    expect(result).toContain('.header');
    expect(result).toContain('body');
    expect(result).toContain('.card');
    expect(result).not.toContain('$primary-color');
    expect(result).not.toMatch(/\$[a-zA-Z0-9_-]+/); // Should not contain any SCSS variables
    expect(result).not.toMatch(/@mixin\s/); // Should not contain mixin definitions
    expect(result).not.toMatch(/@include\s/); // Should not contain mixin includes
    expect(result).not.toMatch(/@import\s/); // Should not contain import statements
  });

  it('supports legacy node_sass config', async () => {
    hexo.config.node_sass = { outputStyle: 'compressed' };
    rendererSass(hexo);
    const mockCss = Buffer.from('body{color:red}');
    jest.spyOn(sass, 'renderSync').mockImplementation((config) => {
      expect(config.outputStyle).toBe('compressed');
      return { css: mockCss } as any;
    });
    const fn = registered['scss'];
    const result = await fn.call(hexo, { text: 'body { color: red; }', path: 'test.scss' });
    expect(result).toBe('body{color:red}');
  });

  it('adds node_modules includePaths', async () => {
    rendererSass(hexo);
    jest.spyOn(sass, 'renderSync').mockImplementation((config) => {
      expect(config.includePaths).toContain(path.join(hexo.base_dir, 'node_modules'));
      expect(config.includePaths).toContain(path.join(hexo.theme_dir, 'node_modules'));
      return { css: Buffer.from('') } as any;
    });
    const fn = registered['scss'];
    await fn.call(hexo, { text: '', path: 'test.scss' });
  });
});
