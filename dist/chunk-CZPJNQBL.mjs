import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  objectWithoutKeys
} from "./chunk-SLQCI6BS.mjs";
import {
  rollupPluginFromName_default
} from "./chunk-DJE7EJBQ.mjs";

// src/renderer/rollup/utils/createRollupPlugin.js
var createRollupPlugin = (config) => {
  if (typeof config === "string") {
    return rollupPluginFromName_default(config)({});
  }
  if (typeof config === "object" && "name" in config) {
    const plugin = rollupPluginFromName_default(config.name);
    const options = objectWithoutKeys(config, ["name"]);
    return plugin(options);
  }
  throw new TypeError("config most object!");
};
var createRollupPlugin_default = createRollupPlugin;

export {
  createRollupPlugin_default
};
