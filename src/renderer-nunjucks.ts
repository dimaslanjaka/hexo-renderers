'use strict';

import fs from 'fs-extra';
import nunjucks from 'nunjucks';
import path from 'upath';
import { toArray } from './helper/index.js';
//const ansiColors = require('ansi-colors');
import Hexo from 'hexo';
import { StoreFunction } from 'hexo/dist/extend/renderer-d';
import { PageSchema } from 'hexo/dist/types';
import { md5, md5FileSync, persistentCache } from 'sbg-utility';
import { HexoLocalsData, HexoRenderData } from './helper/hexoLocalsData.js';
//const logname = ansiColors.magentaBright('hexo-renderer-nunjucks');

/**
 * hexo-renderer-nunjucks
 * @param hexo
 */
export function rendererNunjucks(hexo: Hexo) {
  const cacheUnit = new persistentCache({
    base: path.join(hexo.base_dir, 'tmp/hexo-renderers'),
    name: 'nunjucks-renderer',
    persist: true,
    memory: false
  });

  /**
   * theme directory
   */
  const themeDir = path.join(hexo.base_dir, 'themes', hexo.config.theme);
  const env = nunjucks.configure([themeDir, path.join(themeDir, 'layout')], {
    noCache: true,
    autoescape: false,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false
  });

  env.addFilter('toArray', toArray);

  /**
   * render
   * @param data
   * @param locals
   * @returns
   */
  function render(data: PageSchema & Record<string, any>, locals: Partial<HexoLocalsData> & Record<string, any>) {
    const cacheKey = 'render-' + (md5FileSync(data.path as string) || md5(data.text as string));
    const cacheValue = cacheUnit.getSync(cacheKey, '');
    if (cacheValue.length > 0) return cacheValue;

    if ('text' in data) {
      return nunjucks.renderString(data.text as string, locals);
    }

    const result = nunjucks.render(data.path as string, locals);
    cacheUnit.setSync(cacheKey, result);
    return result;
  }

  /**
   * compile
   * @param data
   * @returns
   */
  function compile(data: HexoRenderData & Record<string, any>) {
    // const cacheKey = 'compile-' + (md5FileSync(data.path as string) || md5(data.text as string));

    // hexo.log.info(logname, 'text' in data ? data.text : data.path);
    const compiled = nunjucks.compile(
      'text' in data ? (data.text as string) : fs.readFileSync(data.path as string, 'utf-8'),
      env
    );
    // const originalRender = compiled.render;
    // compiled.render = function (context?: Record<string, any>, callback?: nunjucks.TemplateCallback<string>) {
    //   if (typeof callback === 'function') {
    //     const cacheValue = cacheUnit.getSync(cacheKey, '');
    //     if (cacheValue.length > 0) {
    //       callback(null, cacheValue);
    //     } else {
    //       originalRender(context, function (err, result) {
    //         cacheUnit.setSync(cacheKey, result);
    //         callback(err, result);
    //       });
    //     }
    //   } else {
    //     const cacheValue = cacheUnit.getSync(cacheKey, '');
    //     if (cacheValue.length > 0) return cacheValue;
    //     const result = originalRender(context);
    //     cacheUnit.setSync(cacheKey, result);
    //     return result;
    //   }
    // } as any;

    return compiled.render.bind(compiled);
  }

  // hexo Renderer API implicitly requires 'compile' to be a value of the rendering function
  render.compile = compile;

  // hexo.extend.renderer.register('swig', 'html', render, true);
  hexo.extend.renderer.register('njk', 'html', render as StoreFunction, false);
  hexo.extend.renderer.register('j2', 'html', render as StoreFunction, false);

  return { render, rendererNunjucks, compile };
}

export default rendererNunjucks;
