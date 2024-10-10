import * as hexo_dist_extend_renderer_d from 'hexo/dist/extend/renderer-d';
import * as Hexo from 'hexo';

/**
 * hexo-renderer-stylus
 * @param {import('hexo')} hexo
 */
declare function rendererStylus(hexo: Hexo): void;
/**
 * @param {import('hexo/dist/extend/renderer-d').StoreFunctionData} data
 * @param {Record<string, any>} options
 * @param {(err: Error|undefined|null, result: string)=>any} callback
 */
declare function stylusFn(data: hexo_dist_extend_renderer_d.StoreFunctionData, options: Record<string, any>, callback: (err: Error | undefined | null, result: string) => any): void;
declare namespace stylusFn {
    let disableNunjucks: boolean;
}

export { rendererStylus, stylusFn };
