'use strict';

var objectWithoutKeys = require('./objectWithoutKeys.cjs');
var rollupPluginFromName = require('./rollupPluginFromName.cjs');

/**
 * @param config
 */
const createRollupPlugin = (config) => {
    if (typeof config === 'string') {
        return rollupPluginFromName(config)({});
    }
    if (typeof config === 'object' && 'name' in config) {
        const plugin = rollupPluginFromName(config.name);
        const options = objectWithoutKeys.objectWithoutKeys(config, ['name']);
        return plugin(options);
    }
    throw new TypeError('config most object!');
};

module.exports = createRollupPlugin;
