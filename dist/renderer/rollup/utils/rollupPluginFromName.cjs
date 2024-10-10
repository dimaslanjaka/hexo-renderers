"use strict";

// src/renderer/rollup/utils/rollupPluginFromName.js
var rollupPluginFromName = (name) => {
  if (typeof name !== "string") {
    throw new TypeError("name most string");
  }
  const pluginPrefix = "rollup-plugin-";
  if (!name.startsWith(pluginPrefix)) {
    name = pluginPrefix + name;
  }
  return require(name);
};
module.exports = rollupPluginFromName;
