import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// src/renderer/rollup/utils/rollupPluginFromName.js
import { createRequire } from "module";
var require2 = createRequire(import.meta.url);
var rollupPluginFromName = (name) => {
  if (typeof name !== "string") {
    throw new TypeError("name most string");
  }
  const pluginPrefix = "rollup-plugin-";
  if (!name.startsWith(pluginPrefix)) {
    name = pluginPrefix + name;
  }
  return require2(name);
};
var rollupPluginFromName_default = rollupPluginFromName;

export {
  rollupPluginFromName_default
};
