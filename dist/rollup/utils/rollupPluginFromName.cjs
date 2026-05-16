'use strict';

var module$1 = require('module');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
if (typeof require === 'undefined')
    global.require = module$1.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('rollup/utils/rollupPluginFromName.cjs', document.baseURI).href)));
/**
 * Retrieves a Rollup plugin by name.
 *
 * @param name - The name of the Rollup plugin. If it does not start with "rollup-plugin-", the prefix will be added.
 * @returns A function that takes options and returns a Rollup plugin.
 * @throws TypeError if the name is not a string.
 */
function rollupPluginFromName(name) {
    if (typeof name !== 'string') {
        throw new TypeError('name must be a string');
    }
    const pluginPrefix = 'rollup-plugin-';
    if (!name.startsWith(pluginPrefix)) {
        name = pluginPrefix + name;
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(name);
}

module.exports = rollupPluginFromName;
