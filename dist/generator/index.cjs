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

// src/generator/index.ts
var generator_exports = {};
__export(generator_exports, {
  registerCustomGenerator: () => registerCustomGenerator
});
module.exports = __toCommonJS(generator_exports);

// src/generator/meta.ts
var meta = {
  tags: [],
  posts: [],
  categories: []
};
function metaJsonCreator(hexo) {
  hexo.extend.generator.register("meta", function(locals) {
    locals.tags.sort("name").each(function(tag) {
      if (!meta.tags.includes(tag.name)) meta.tags.push(tag.name);
    });
    locals.categories.sort("name").each(function(category) {
      if (!meta.categories.includes(category.name)) meta.categories.push(category.name);
    });
    locals.posts.sort("name").each(function(post) {
      meta.posts.push({
        title: post.title,
        url: encodeURI(post.permalink),
        // get modified date first
        date: post.updated.toDate().toISOString() || post.date.toDate().toISOString()
      });
    });
    return { path: "meta.json", data: JSON.stringify(meta) };
  });
}

// src/generator/index.ts
function registerCustomGenerator(hexo, generators) {
  if ("meta" in generators) metaJsonCreator(hexo);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerCustomGenerator
});
