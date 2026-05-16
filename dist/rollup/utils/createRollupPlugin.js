import { objectWithoutKeys } from './objectWithoutKeys.js';
import rollupPluginFromName from './rollupPluginFromName.js';

/**
 * @param config
 */
const createRollupPlugin = (config) => {
    if (typeof config === 'string') {
        return rollupPluginFromName(config)({});
    }
    if (typeof config === 'object' && 'name' in config) {
        const plugin = rollupPluginFromName(config.name);
        const options = objectWithoutKeys(config, ['name']);
        return plugin(options);
    }
    throw new TypeError('config most object!');
};

export { createRollupPlugin as default };
