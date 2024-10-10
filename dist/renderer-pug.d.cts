import Hexo__default from 'hexo';
import * as pug from 'pug';

/**
 * hexo-renderer-pug
 * @param hexo
 */
declare function rendererPug(hexo: Hexo__default): {
    (data: any, locals: any): string;
    compile: (data: any) => pug.compileTemplate;
};

export { rendererPug as default, rendererPug };
