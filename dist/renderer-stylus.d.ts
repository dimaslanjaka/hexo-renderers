import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
/**
 * @param data
 * @param options
 * @param callback
 */
export declare function stylusFn(this: Hexo & Record<string, any>, data: StoreFunctionData, options: Record<string, any>, callback: (err: Error | undefined | null, result: string) => any): void;
export declare namespace stylusFn {
    var disableNunjucks: boolean;
}
/**
 * hexo-renderer-stylus
 * @param {import('hexo')} hexo
 */
export declare function rendererStylus(hexo: any): void;
