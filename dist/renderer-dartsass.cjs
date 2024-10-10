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

// src/renderer-dartsass.ts
var renderer_dartsass_exports = {};
__export(renderer_dartsass_exports, {
  rendererDartSass: () => rendererDartSass
});
module.exports = __toCommonJS(renderer_dartsass_exports);
var import_sass = __toESM(require("sass"));
function rendererDartSass(hexo) {
  const make = function(data, _options) {
    const config = Object.assign(this.theme.config.sass || {}, this.config.sass || {}, { file: data.path });
    return new Promise((resolve, reject) => {
      import_sass.default.compileAsync(data.path, config).then(function(result) {
        resolve(result.css);
      }).catch(reject);
    });
  };
  hexo.extend.renderer.register("scss", "css", make);
  hexo.extend.renderer.register("sass", "css", make);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rendererDartSass
});
