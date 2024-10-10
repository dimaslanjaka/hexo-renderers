import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __commonJS,
  __require
} from "./chunk-QAIXVEL3.mjs";

// src/renderer/rollup/utils/rollupPluginFromName.js
var require_rollupPluginFromName = __commonJS({
  "src/renderer/rollup/utils/rollupPluginFromName.js"(exports, module) {
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
    module.exports = rollupPluginFromName;
  }
});

export {
  require_rollupPluginFromName
};
