'use strict';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/**
 * @param {string} name
 * @param {*} options
 * @return {(options: { [x: string]: any; }) => rollup.Plugin}
 */
const rollupPluginFromName = (name) => {
  if (typeof name !== 'string') {
    throw new TypeError('name most string');
  }
  const pluginPrefix = 'rollup-plugin-';

  if (!name.startsWith(pluginPrefix)) {
    name = pluginPrefix + name;
  }

  return require(name);
};

export default rollupPluginFromName;
