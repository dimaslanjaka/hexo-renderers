import Hexo from 'hexo';
import * as pug from 'pug';
/**
 * hexo-renderer-pug
 * @param hexo
 */
export declare function rendererPug(hexo: Hexo): {
    (data: any, locals: any): string;
    compile: (data: any) => pug.compileTemplate;
};
export default rendererPug;
