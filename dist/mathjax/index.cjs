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

// src/mathjax/index.ts
var mathjax_exports = {};
__export(mathjax_exports, {
  rendererMathjax: () => rendererMathjax
});
module.exports = __toCommonJS(mathjax_exports);

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/mathjax/index.ts
var import_ejs = __toESM(require("ejs"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var __filename2 = (0, import_url.fileURLToPath)(importMetaUrl);
var __dirname = import_path.default.dirname(__filename2);
var layout = "layout.ejs";
var bodyTag = "</body>";
var mathjaxScript = import_fs.default.readFileSync(import_path.default.join(__dirname, "mathjax.html"), "utf-8");
function rendererMathjax(hexo) {
  hexo.extend.renderer.register("ejs", "html", function(data, options) {
    const path2 = options.filename = data.path;
    let content = data.text;
    if (layout === path2.substring(path2.length - layout.length)) {
      content = content.replace(bodyTag, mathjaxScript + "\n" + bodyTag);
    }
    return import_ejs.default.render(content, options, { async: true });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rendererMathjax
});
