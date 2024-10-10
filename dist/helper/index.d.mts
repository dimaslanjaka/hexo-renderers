import Hexo__default from 'hexo';

declare const BASE_DIR: string;
/**
 * register custom helpers
 * @param hexo
 */
declare function registerCustomHelper(hexo: Hexo__default): void;

export { BASE_DIR, registerCustomHelper };
