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

// src/renderer-stylus.ts
var renderer_stylus_exports = {};
__export(renderer_stylus_exports, {
  rendererStylus: () => rendererStylus,
  stylusFn: () => stylusFn
});
module.exports = __toCommonJS(renderer_stylus_exports);
var import_module = require("module");
var import_stylus = __toESM(require("stylus"), 1);
var import_meta = {};
var require2 = (0, import_module.createRequire)(import_meta.url);
function getProperty(obj, name) {
  name = name.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "");
  const split = name.split(".");
  let key = split.shift();
  if (!key) return "";
  if (!Object.prototype.hasOwnProperty.call(obj, key)) return "";
  let result = obj[key];
  const len = split.length;
  if (!len) {
    if (result === 0) return result;
    return result || "";
  }
  if (typeof result !== "object") return "";
  for (let i = 0; i < len; i++) {
    key = split[i];
    if (!Object.prototype.hasOwnProperty.call(result, key)) return "";
    result = result[split[i]];
    if (typeof result !== "object") return result;
  }
  return result;
}
function applyPlugins(stylusConfig, plugins) {
  plugins.forEach((plugin) => {
    const factoryFn = require2(plugin.trim());
    stylusConfig.use(factoryFn());
  });
}
function stylusFn(data, options, callback) {
  const self = this;
  const config = self.config.stylus || {};
  const plugins = ["nib"].concat(config.plugins || []);
  function defineConfig(style) {
    style.define("hexo-config", (data2) => {
      return getProperty(self.theme.config, data2.val);
    });
  }
  const stylusConfig = (0, import_stylus.default)(data.text);
  applyPlugins(stylusConfig, plugins);
  stylusConfig.use(defineConfig).use((style) => self.execFilterSync("stylus:renderer", style, { context: this })).set("filename", data.path).set("sourcemap", config.sourcemaps).set("compress", config.compress).set("include css", true).render(callback);
}
stylusFn.disableNunjucks = true;
function rendererStylus(hexo) {
  hexo.extend.renderer.register("styl", "css", stylusFn);
  hexo.extend.renderer.register("stylus", "css", stylusFn);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rendererStylus,
  stylusFn
});
