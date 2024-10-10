"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// src/renderer/rollup/utils/rollupPluginFromName.js
var require_rollupPluginFromName = __commonJS({
  "src/renderer/rollup/utils/rollupPluginFromName.js"(exports2, module2) {
    "use strict";
    var rollupPluginFromName2 = (name) => {
      if (typeof name !== "string") {
        throw new TypeError("name most string");
      }
      const pluginPrefix = "rollup-plugin-";
      if (!name.startsWith(pluginPrefix)) {
        name = pluginPrefix + name;
      }
      return require(name);
    };
    module2.exports = rollupPluginFromName2;
  }
});

// src/renderer/rollup/utils/objectWithoutKeys.ts
var objectWithoutKeys_exports = {};
__export(objectWithoutKeys_exports, {
  default: () => objectWithoutKeys_default,
  objectWithoutKeys: () => objectWithoutKeys
});
var objectWithoutKeys, objectWithoutKeys_default;
var init_objectWithoutKeys = __esm({
  "src/renderer/rollup/utils/objectWithoutKeys.ts"() {
    "use strict";
    objectWithoutKeys = (obj, keys) => {
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
    objectWithoutKeys_default = objectWithoutKeys;
  }
});

// src/renderer/rollup/utils/createRollupPlugin.js
var rollupPluginFromName = require_rollupPluginFromName();
var { objectWithoutKeys: objectWithoutKeys2 } = (init_objectWithoutKeys(), __toCommonJS(objectWithoutKeys_exports));
var createRollupPlugin = (config) => {
  if (typeof config === "string") {
    return rollupPluginFromName(config)({});
  }
  if (typeof config === "object" && "name" in config) {
    const plugin = rollupPluginFromName(config.name);
    const options = objectWithoutKeys2(config, ["name"]);
    return plugin(options);
  }
  throw new TypeError("config most object!");
};
module.exports = createRollupPlugin;
