"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/renderer/rollup/utils/objectMap.js
var require_objectMap = __commonJS({
  "src/renderer/rollup/utils/objectMap.js"(exports2, module2) {
    "use strict";
    var objectMap2 = (obj, callback, thisArg = void 0) => {
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
    module2.exports = objectMap2;
  }
});

// src/renderer/rollup/utils/toAbsolutePaths.js
var { join, isAbsolute } = require("path");
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
