import * as rollup from 'rollup';

type Hexo = NodeJS.EventEmitter;
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
}, _options?: rollup.RollupOptions | undefined): Promise<string | undefined>;

export { type Hexo, renderer as default, _rollupRenderAsync as rollupRenderAsync };
