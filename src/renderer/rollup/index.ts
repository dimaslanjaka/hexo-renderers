'use strict';

import Hexo from 'hexo';
import renderer from './renderer';

export function rendererRollup(hexo: Hexo) {
  hexo.extend.renderer.register('js', 'js', renderer);
  hexo.extend.renderer.register('mjs', 'js', renderer);
}
