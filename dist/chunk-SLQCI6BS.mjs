import { createRequire } from 'module'; const require = createRequire(import.meta.url);

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
var objectWithoutKeys_default = objectWithoutKeys;

export {
  objectWithoutKeys,
  objectWithoutKeys_default
};
