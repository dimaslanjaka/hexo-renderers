'use strict';

import Hexo from 'hexo';
import renderer from './renderer';
import { StoreFunction } from 'hexo/dist/extend/renderer-d';

export function rendererRollup(hexo: Hexo) {
  hexo.extend.renderer.register('js', 'js', renderer as StoreFunction);
  hexo.extend.renderer.register('mjs', 'js', renderer as StoreFunction);
}
