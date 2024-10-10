"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/renderer/rollup/utils/createRollupPlugin.js
var createRollupPlugin_exports = {};
__export(createRollupPlugin_exports, {
  default: () => createRollupPlugin_default
});
module.exports = __toCommonJS(createRollupPlugin_exports);

// src/renderer/rollup/utils/objectWithoutKeys.ts
var objectWithoutKeys = (obj, keys) => {
  if (!Array.isArray(keys)) {
    throw new TypeError("keys most string[].");
  }
  return Object.keys(obj).reduce(
    (newObject, key) => {
      if (!keys.includes(key)) newObject[key] = obj[key];
      return newObject;
    },
    {}
  );
};

// src/renderer/rollup/utils/rollupPluginFromName.js
var import_module = require("module");
var import_meta = {};
var require2 = (0, import_module.createRequire)(import_meta.url);
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
