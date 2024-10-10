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

// src/renderer-pug.ts
var renderer_pug_exports = {};
__export(renderer_pug_exports, {
  default: () => renderer_pug_default,
  rendererPug: () => rendererPug
});
module.exports = __toCommonJS(renderer_pug_exports);
var import_module = require("module");
var path = __toESM(require("path"), 1);
var pug = __toESM(require("pug"), 1);
var import_meta = {};
var require2 = (0, import_module.createRequire)(import_meta.url);
function rendererPug(hexo) {
  const configPath = path.join(process.cwd(), "pug.config");
  const defaultConfig = { compile: {} };
  let hasConfig = true;
  try {
    require2.resolve(configPath);
  } catch {
    hasConfig = false;
  }
  const config = hasConfig ? require2(configPath) : defaultConfig;
  const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  const invalidKeys = Object.keys(config).filter((k) => !hasProp(defaultConfig, k));
  if (invalidKeys.length > 0) {
    throw Error(`Unsupported PUG config keys: ${invalidKeys.join(", ")}`);
  }
  function pugCompile(data) {
    const opts = {
      ...config.compile,
      filename: data.path
      // always used
    };
    return pug.compile(data.text, opts);
  }
  function pugRenderer(data, locals) {
    return pugCompile(data)(locals);
  }
  pugRenderer.compile = pugCompile;
  hexo.extend.renderer.register("pug", "html", pugRenderer, true);
  return pugRenderer;
}
var renderer_pug_default = rendererPug;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rendererPug
});
