import Hexo__default from 'hexo';

declare const BASE_DIR: string;
/**
 * load all scripts
 * @param base
 */
declare function loadScripts(base: string): void;
declare function isObject(value: any): boolean;
declare function toArray(value: any): any;
/**
 * register custom helpers
 * @param hexo
 */
declare function registerCustomHelper(hexo: Hexo__default): void;

export { BASE_DIR, isObject, loadScripts, registerCustomHelper, toArray };
