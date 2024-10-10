import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __esm,
  __export
} from "./chunk-QAIXVEL3.mjs";

// src/renderer/rollup/utils/objectWithoutKeys.ts
var objectWithoutKeys_exports = {};
__export(objectWithoutKeys_exports, {
  default: () => objectWithoutKeys_default,
  objectWithoutKeys: () => objectWithoutKeys
});
var objectWithoutKeys, objectWithoutKeys_default;
var init_objectWithoutKeys = __esm({
  "src/renderer/rollup/utils/objectWithoutKeys.ts"() {
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

export {
  objectWithoutKeys,
  objectWithoutKeys_default,
  objectWithoutKeys_exports,
  init_objectWithoutKeys
};
