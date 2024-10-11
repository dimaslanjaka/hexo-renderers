'use strict';
import renderer from './renderer.js';
export function rendererRollup(hexo) {
    hexo.extend.renderer.register('js', 'js', renderer);
    hexo.extend.renderer.register('mjs', 'js', renderer);
}
