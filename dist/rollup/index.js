import renderer from './renderer.js';

function rendererRollup(hexo) {
    hexo.extend.renderer.register('js', 'js', renderer);
    hexo.extend.renderer.register('mjs', 'js', renderer);
}

export { rendererRollup };
