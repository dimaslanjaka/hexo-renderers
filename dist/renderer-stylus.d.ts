/**
 * hexo-renderer-stylus
 * @param {import('hexo')} hexo
 */
export function rendererStylus(hexo: import("hexo")): void;
/**
 * @param {import('hexo/dist/extend/renderer-d').StoreFunctionData} data
 * @param {Record<string, any>} options
 * @param {(err: Error|undefined|null, result: string)=>any} callback
 */
export function stylusFn(data: import("hexo/dist/extend/renderer-d").StoreFunctionData, options: Record<string, any>, callback: (err: Error | undefined | null, result: string) => any): void;
export namespace stylusFn {
    let disableNunjucks: boolean;
}
