import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __commonJS
} from "./chunk-QAIXVEL3.mjs";

// src/renderer/rollup/utils/objectMap.js
var require_objectMap = __commonJS({
  "src/renderer/rollup/utils/objectMap.js"(exports, module) {
    var objectMap = (obj, callback, thisArg = void 0) => {
      if (obj == null) {
        throw new TypeError();
      }
      if (Array.isArray(obj)) {
        return obj.map(callback, thisArg);
      }
      const type = typeof obj;
      if (type !== "object" && type !== "string") {
        throw new TypeError();
      }
      if (typeof obj[Symbol.iterator] === "function") {
        return Array.from(obj, callback, thisArg);
      }
      if (typeof obj.length === "number") {
        return Array.from(obj, callback, thisArg);
      }
      return Object.values(obj).map(callback, thisArg);
    };
    module.exports = objectMap;
  }
});

export {
  require_objectMap
};
