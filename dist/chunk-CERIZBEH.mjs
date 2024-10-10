import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __require
} from "./chunk-LPG7NA4D.mjs";

// src/renderer/rollup/utils/rollupPluginFromName.js
import { createRequire } from "module";
if (typeof __require === "undefined") global.require = createRequire(import.meta.url);
var rollupPluginFromName = (name) => {
  if (typeof name !== "string") {
    throw new TypeError("name most string");
  }
  const pluginPrefix = "rollup-plugin-";
  if (!name.startsWith(pluginPrefix)) {
    name = pluginPrefix + name;
  }
  return __require(name);
};
var rollupPluginFromName_default = rollupPluginFromName;

export {
  rollupPluginFromName_default
};
