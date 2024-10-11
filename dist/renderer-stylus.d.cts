import Hexo__default from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';

/**
 * @param data
 * @param options
 * @param callback
 */
declare function stylusFn(this: Hexo__default & Record<string, any>, data: StoreFunctionData, options: Record<string, any>, callback: (err: Error | undefined | null, result: string) => any): void;
declare namespace stylusFn {
    var disableNunjucks: boolean;
}
/**
 * hexo-renderer-stylus
 * @param {import('hexo')} hexo
 */
declare function rendererStylus(hexo: any): void;

export { rendererStylus, stylusFn };
