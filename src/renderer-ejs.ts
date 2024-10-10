import * as ejs from 'ejs';
import Hexo from 'hexo';
import type { StoreFunction, StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import { toArray } from './helper/index.js';

/**
 * hexo-renderer-ejs
 * @param hexo
 */
export function rendererEjs(hexo: Hexo) {
  if ((ejs as any).filters) (ejs as any).filters.toArray = toArray;
  function ejsRenderer(data: StoreFunctionData, locals: any) {
    return ejs.render(data.text as string, Object.assign({ filename: data.path }, locals));
  }

  ejsRenderer.compile = function (data: StoreFunctionData) {
    return ejs.compile(data.text as string, {
      filename: data.path
    });
  };

  hexo.extend.renderer.register('ejs', 'html', ejsRenderer as StoreFunction, true);
}

export default rendererEjs;
