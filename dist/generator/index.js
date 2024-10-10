import { metaJsonCreator } from './meta.js';
export function registerCustomGenerator(hexo, generators) {
    if ('meta' in generators)
        metaJsonCreator(hexo);
}
