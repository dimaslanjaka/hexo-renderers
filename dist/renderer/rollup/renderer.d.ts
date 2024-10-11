export { _rollupRenderAsync as rollupRenderAsync };
export default renderer;
export type Hexo = NodeJS.EventEmitter;
/**
 * @param {{ input: rollup.RollupFileOptions; output: rollup.OutputOptions; }} config
 * @return { Promise<string> }
 */
declare function _rollupRenderAsync(config: {
    input: rollup.RollupFileOptions;
    output: rollup.OutputOptions;
}): Promise<string>;
/**
 * rollup renderer callback
 * @param {{text?:string,path?:string}} data
 * @param {import('rollup').RollupOptions} [_options]
 * @returns
 */
declare function renderer(data: {
    text?: string;
    path?: string;
}, _options?: import("rollup").RollupOptions | undefined): Promise<string | undefined>;
