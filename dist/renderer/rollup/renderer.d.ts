export = renderer;
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
declare namespace renderer {
    export { rollupRenderAsync, Hexo };
}
/**
 * @param {{ input: rollup.RollupFileOptions; output: rollup.OutputOptions; }} config
 * @return { Promise<string> }
 */
declare function rollupRenderAsync(config: {
    input: rollup.RollupFileOptions;
    output: rollup.OutputOptions;
}): Promise<string>;
type Hexo = NodeJS.EventEmitter;
