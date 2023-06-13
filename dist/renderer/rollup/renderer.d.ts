export = renderer;
/**
 * @param {Record<string,any>} _data
 * @param {string?} _data.path
 * @param {string?} _data.text
 * @returns {Promise<string>}
 */
declare function renderer({ path, text }: Record<string, any>, _options: any): Promise<string>;
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
