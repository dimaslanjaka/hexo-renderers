import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  init_objectWithoutKeys,
  objectWithoutKeys_exports
} from "./chunk-4HGMZJ35.mjs";
import {
  require_rollupPluginFromName
} from "./chunk-PXPCNKTU.mjs";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-QAIXVEL3.mjs";

// src/renderer/rollup/utils/createRollupPlugin.js
var require_createRollupPlugin = __commonJS({
  "src/renderer/rollup/utils/createRollupPlugin.js"(exports, module) {
    var rollupPluginFromName = require_rollupPluginFromName();
    var { objectWithoutKeys } = (init_objectWithoutKeys(), __toCommonJS(objectWithoutKeys_exports));
    var createRollupPlugin = (config) => {
      if (typeof config === "string") {
        return rollupPluginFromName(config)({});
      }
      if (typeof config === "object" && "name" in config) {
        const plugin = rollupPluginFromName(config.name);
        const options = objectWithoutKeys(config, ["name"]);
        return plugin(options);
      }
      throw new TypeError("config most object!");
    };
    module.exports = createRollupPlugin;
  }
});

export {
  require_createRollupPlugin
};
