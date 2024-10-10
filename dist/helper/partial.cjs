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

// src/helper/partial.ts
var partial_exports = {};
__export(partial_exports, {
  partialWithLayout: () => partialWithLayout
});
module.exports = __toCommonJS(partial_exports);
var import_upath = require("upath");
function partialWithLayout(ctx) {
  return function partialWithLayout2(name, locals, options = {}) {
    if (typeof name !== "string") throw new TypeError("argument name must be a string!");
    const { cache } = options;
    const self = this;
    const viewDir = self.view_dir;
    const currentView = self.filename.substring(viewDir.length);
    const path = (0, import_upath.join)((0, import_upath.dirname)(currentView), name);
    const view = ctx.theme.getView(path) || ctx.theme.getView(name);
    const viewLocals = { layout: false };
    if (!view) {
      throw new Error(`Partial ${name} does not exist. (in ${currentView})`);
    }
    if (options.only) {
      Object.assign(viewLocals, locals);
    } else {
      Object.assign(viewLocals, this, locals);
    }
    if (cache) {
      const cacheId = typeof cache === "string" ? cache : view.path;
      return this.fragment_cache(cacheId, () => view.renderSync(viewLocals));
    }
    return view.renderSync(viewLocals);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  partialWithLayout
});
