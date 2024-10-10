/**
 * @param {string} name
 * @param {*} options
 * @return {(options: { [x: string]: any; }) => rollup.Plugin}
 */
declare function rollupPluginFromName(name: string): (options: {
    [x: string]: any;
}) => rollup.Plugin;

export { rollupPluginFromName as default };
