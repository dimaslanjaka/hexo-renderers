/**
 * hexo-renderer-pug
 * @param {import('hexo')} hexo
 */
export function rendererPug(hexo: import("hexo")): {
    (data: import("./helper/hexoLocalsData").HexoLocalsData, locals: Record<string, any>): string;
    compile: (data: any) => pug.compileTemplate;
};
import pug = require("pug");
