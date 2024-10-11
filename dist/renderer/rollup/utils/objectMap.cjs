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

// src/renderer/rollup/utils/objectMap.js
var objectMap_exports = {};
__export(objectMap_exports, {
  default: () => objectMap_default
});
module.exports = __toCommonJS(objectMap_exports);
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
