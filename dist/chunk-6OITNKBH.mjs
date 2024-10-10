import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// src/renderer/rollup/utils/objectMap.js
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
var objectMap_default = objectMap;

export {
  objectMap_default
};
