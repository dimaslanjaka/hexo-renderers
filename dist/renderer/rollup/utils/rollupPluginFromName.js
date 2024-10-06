'use strict';
/**
 * @param {string} name
 * @param {*} options
 * @return {(options: { [x: string]: any; }) => rollup.Plugin}
 */
var rollupPluginFromName = function (name) {
    if (typeof name !== 'string') {
        throw new TypeError('name most string');
    }
    var pluginPrefix = 'rollup-plugin-';
    if (!name.startsWith(pluginPrefix)) {
        name = pluginPrefix + name;
    }
    return require(name);
};
module.exports = rollupPluginFromName;
