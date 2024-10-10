import { HexoLocalsData } from './helper/hexoLocalsData.mjs';
import * as Hexo from 'hexo';
import pug from 'pug';

/**
 * hexo-renderer-pug
 * @param {import('hexo')} hexo
 */
declare function rendererPug(hexo: Hexo): {
    (data: HexoLocalsData, locals: Record<string, any>): string;
    compile: (data: any) => pug.compileTemplate;
};

export { rendererPug };
