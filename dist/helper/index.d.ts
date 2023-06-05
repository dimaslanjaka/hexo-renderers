import Hexo from 'hexo';
export declare const BASE_DIR: string;
export declare function getTheAuthor(authorObj: Record<string, any> | string): string | undefined;
/**
 * register custom helpers
 * @param hexo
 */
export declare function registerCustomHelper(hexo: Hexo): void;
