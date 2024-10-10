import Hexo from 'hexo';
export declare const BASE_DIR: string;
/**
 * load all scripts
 * @param base
 */
export declare function loadScripts(base: string): void;
export declare function isObject(value: any): boolean;
export declare function toArray(value: any): any;
/**
 * register custom helpers
 * @param hexo
 */
export declare function registerCustomHelper(hexo: Hexo): void;
