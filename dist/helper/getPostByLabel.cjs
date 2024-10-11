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

// src/helper/getPostByLabel.ts
var getPostByLabel_exports = {};
__export(getPostByLabel_exports, {
  getPostByLabel: () => getPostByLabel,
  getPostByLabelInternal: () => getPostByLabelInternal
});
module.exports = __toCommonJS(getPostByLabel_exports);
function getPostByLabelInternal(by, filternames) {
  const hexo = this;
  const data = hexo.site[by].data;
  if (Array.isArray(data)) {
    console.log(typeof data.filter);
    const map = filternames.map((filtername) => {
      const filter = data.filter(({ name }) => String(name).toLowerCase() == filtername.toLowerCase());
      return filter.map((group) => {
        return group.posts.map(function({ title, permalink, thumbnail, photos }) {
          return { title, permalink, thumbnail, photos };
        });
      });
    }).flat(2);
    return map;
  }
  return [];
}
function getPostByLabel(hexo) {
  hexo.extend.helper.register("getPostByLabel", getPostByLabelInternal);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPostByLabel,
  getPostByLabelInternal
});
