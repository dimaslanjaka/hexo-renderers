import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  require_objectMap
} from "./chunk-BFDENCYN.mjs";
import {
  __commonJS,
  __require
} from "./chunk-QAIXVEL3.mjs";

// src/renderer/rollup/utils/toAbsolutePaths.js
var require_toAbsolutePaths = __commonJS({
  "src/renderer/rollup/utils/toAbsolutePaths.js"(exports, module) {
    var { join, isAbsolute } = __require("path");
    var objectMap = require_objectMap();
    var toAbsolutePath = (targets, base) => {
      if (targets == null) {
        return [];
      }
      if (typeof targets === "string") {
        if (isAbsolute(targets)) {
          return targets;
        }
        return join(base, targets);
      }
      return objectMap(targets, (x) => {
        return isAbsolute(x) ? x : join(base, x);
      });
    };
    module.exports = toAbsolutePath;
  }
});

export {
  require_toAbsolutePaths
};
