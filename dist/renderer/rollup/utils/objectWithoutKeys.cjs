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

// src/renderer/rollup/utils/objectWithoutKeys.ts
var objectWithoutKeys_exports = {};
__export(objectWithoutKeys_exports, {
  default: () => objectWithoutKeys_default,
  objectWithoutKeys: () => objectWithoutKeys
});
module.exports = __toCommonJS(objectWithoutKeys_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  objectWithoutKeys
});
