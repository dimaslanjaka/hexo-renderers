"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/renderer/rollup/utils/createReadFilterProxy.js
var createReadFilterProxy_exports = {};
__export(createReadFilterProxy_exports, {
  default: () => createReadFilterProxy_default
});
module.exports = __toCommonJS(createReadFilterProxy_exports);
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
var createReadFilterProxy_default = createReadFilterProxy;
