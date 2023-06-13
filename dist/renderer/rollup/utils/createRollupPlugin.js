'use strict';
var rollupPluginFromName = require('./rollupPluginFromName');
var objectWithoutKeys = require('./objectWithoutKeys');
/**
 * @param {string|{name:string}} config
 */
var createRollupPlugin = function (config) {
    if (typeof config === 'string') {
        return rollupPluginFromName(config)({});
    }
    if (typeof config === 'object' && 'name' in config) {
        var plugin = rollupPluginFromName(config.name);
        var options = objectWithoutKeys(config, ['name']);
        return plugin(options);
    }
    throw new TypeError('config most object!');
};
module.exports = createRollupPlugin;
