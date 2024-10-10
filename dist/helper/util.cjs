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

// src/helper/util.ts
var util_exports = {};
__export(util_exports, {
  categorieName: () => categorieName,
  logname: () => logname,
  tagName: () => tagName
});
module.exports = __toCommonJS(util_exports);
var import_ansi_colors = __toESM(require("ansi-colors"));
var categorieName = (inCategories) => {
  if (!inCategories) return [];
  if (typeof inCategories.data[0] === "string") return inCategories;
  let catName = "";
  for (let r = 0; r < inCategories.data.length; r++) {
    if (catName != "") catName += " > ";
    catName += inCategories.data[r].name;
  }
  return catName;
};
var tagName = (inTags) => {
  if (!inTags || !Array.isArray(inTags.data)) return [];
  if (typeof inTags.data[0] === "string") return inTags;
  const retTags = [];
  inTags.data.forEach((item) => {
    retTags.push(item.name);
  });
  return retTags;
};
var logname = import_ansi_colors.default.magentaBright("hexo-renderers");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  categorieName,
  logname,
  tagName
});
