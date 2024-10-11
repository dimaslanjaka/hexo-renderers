"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/renderer/rollup/utils/toAbsolutePaths.js
var toAbsolutePaths_exports = {};
__export(toAbsolutePaths_exports, {
  default: () => toAbsolutePaths_default
});
module.exports = __toCommonJS(toAbsolutePaths_exports);
var path = __toESM(require("path"), 1);

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

// src/renderer/rollup/utils/toAbsolutePaths.js
var toAbsolutePath = (targets, base) => {
  if (targets == null) {
    return [];
  }
  if (typeof targets === "string") {
    if (path.isAbsolute(targets)) {
      return targets;
    }
    return path.join(base, targets);
  }
  return objectMap_default(targets, (x) => {
    return path.isAbsolute(x) ? x : path.join(base, x);
  });
};
var toAbsolutePaths_default = toAbsolutePath;
