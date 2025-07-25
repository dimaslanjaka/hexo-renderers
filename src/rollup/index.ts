'use strict';

import Hexo from 'hexo';
import { StoreFunction } from 'hexo/dist/types';
import renderer from './renderer.js';

export function rendererRollup(hexo: Hexo) {
  hexo.extend.renderer.register('js', 'js', renderer as StoreFunction);
  hexo.extend.renderer.register('mjs', 'js', renderer as StoreFunction);
}
