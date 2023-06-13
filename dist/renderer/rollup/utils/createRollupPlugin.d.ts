export = createRollupPlugin;
/**
 * @param {string|{name:string}} config
 */
declare function createRollupPlugin(config: string | {
    name: string;
}): rollup.Plugin;
