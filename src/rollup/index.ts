'use strict';

import Hexo from 'hexo';
import renderer from './renderer.js';

export function rendererRollup(hexo: Hexo) {
  hexo.extend.renderer.register('js', 'js', renderer as any);
  hexo.extend.renderer.register('mjs', 'js', renderer as any);
}
