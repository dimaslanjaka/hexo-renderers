"use strict";

// src/renderer/rollup/utils/createReadFilterProxy.js
var createReadFilterProxy = (target, filters = {}) => {
  if (target == null || typeof target !== "object") {
    throw new TypeError();
  }
  let filterKeys = Object.keys(filters).filter((key) => typeof filters[key] === "function");
  if (!filterKeys) {
    return target;
  }
  const filtersMap = filterKeys.reduce((result, key) => {
    result[key] = filters[key];
    return result;
  }, /* @__PURE__ */ Object.create(null));
  filters = null;
  filterKeys = null;
  return new Proxy(target, {
    get(target2, property, receiver) {
      const original = Reflect.get(target2, property, receiver);
      return property in filtersMap ? filtersMap[property](original, target2) : original;
    }
  });
};
module.exports = createReadFilterProxy;
