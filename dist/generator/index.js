import { metaJsonCreator } from './meta.js';

function registerCustomGenerator(hexo, generators) {
    if ('meta' in generators)
        metaJsonCreator(hexo);
}

export { registerCustomGenerator };
