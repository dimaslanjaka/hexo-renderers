'use strict';

import { createRequire } from 'module';
import type { Plugin } from 'rollup'; // Assuming 'rollup' is installed and type definitions are available

if (typeof require === 'undefined') global.require = createRequire(import.meta.url);

/**
 * Retrieves a Rollup plugin by name.
 *
 * @param name - The name of the Rollup plugin. If it does not start with "rollup-plugin-", the prefix will be added.
 * @returns A function that takes options and returns a Rollup plugin.
 * @throws TypeError if the name is not a string.
 */
function rollupPluginFromName(name: string): (options: Record<string, any>) => Plugin {
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

export default rollupPluginFromName;
