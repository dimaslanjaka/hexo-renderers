import Hexo from 'hexo';
import { createRequire } from 'module';
import path from 'path';
import * as pug from 'pug';

if (typeof require === 'undefined') global.require = createRequire(import.meta.url);

/**
 * hexo-renderer-pug
 * @param hexo
 */
export function rendererPug(hexo: Hexo) {
  const configPath = path.join(process.cwd(), 'pug.config');
  const defaultConfig = { compile: {} }; // avoids key errors

  let hasConfig = true;
  try {
    require.resolve(configPath);
  } catch {
    hasConfig = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const config = hasConfig ? require(configPath) : defaultConfig;

  // Validate non-standard keys -- e.g. 'compile'.
  const hasProp = (fn: (...args: any) => any, prop: PropertyKey) => Object.prototype.hasOwnProperty.call(fn, prop);
  const invalidKeys = Object.keys(config).filter((k) => !hasProp(defaultConfig as any, k));
  if (invalidKeys.length > 0) {
    throw Error(`Unsupported PUG config keys: ${invalidKeys.join(', ')}`);
  }

  function pugCompile(data: Record<string, any>) {
    const opts = {
      ...config.compile,
      filename: data.path // always used
    };
    return pug.compile(data.text, opts);
  }

  /**
   * @param {import('./helper/hexoLocalsData').HexoLocalsData} data
   * @param {Record<string, any>} locals
   * @returns
   */
  function pugRenderer(data: Record<string, any>, locals: Record<string, any>) {
    return pugCompile(data)(locals);
  }

  pugRenderer.compile = pugCompile;

  hexo.extend.renderer.register('pug', 'html', pugRenderer, true);

  return pugRenderer;
}

export default rendererPug;
