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

// src/helper/collector.ts
var collector_exports = {};
__export(collector_exports, {
  collectorPost: () => collectorPost,
  getPostData: () => getPostData,
  loadPostData: () => loadPostData,
  postDataFilePath: () => postDataFilePath
});
module.exports = __toCommonJS(collector_exports);
var cheerio = __toESM(require("cheerio"), 1);
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_path = __toESM(require("path"), 1);
var import_sbg_utility = require("sbg-utility");

// src/helper/util.ts
var import_ansi_colors = __toESM(require("ansi-colors"), 1);
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

// src/helper/collector.ts
var postData = [];
function postDataFilePath(hexo) {
  return import_path.default.join(hexo.base_dir, "tmp/hexo-renderers/post-data.json");
}
function loadPostData(hexo) {
  const file = postDataFilePath(hexo);
  if (import_fs_extra.default.existsSync(file)) {
    try {
      postData = (0, import_sbg_utility.jsonParseWithCircularRefs)(import_fs_extra.default.readFileSync(file, "utf-8"));
    } catch (e) {
      (0, import_sbg_utility.copyPath)(file, import_path.default.join(hexo.base_dir, "tmp/hexo-renderers/errors/loadPostData.json"));
      const tag = "fail load post data";
      hexo.log.error(tag, file);
      hexo.log.error(tag, e.message);
    }
  }
}
var getPostData = () => postData;
async function collectorPost(post, hexo) {
  const integrity = post.full_source ? await (0, import_sbg_utility.file_to_hash)("sha1", post.full_source, "hex") : (0, import_sbg_utility.md5)(String(post.path + post.raw));
  const exPostIndex = postData.findIndex((exPost2) => post.path === exPost2.path);
  const exPost = postData.find((exPost2) => post.path === exPost2.path);
  if (exPost && exPost.integrity === integrity) return;
  const isModified = exPost && exPost.integrity !== integrity;
  post.integrity = integrity;
  let description;
  if (post.description && post.description !== "") {
    description = post.description;
  } else if (post.excerpt && post.excerpt !== "") {
    description = post.excerpt;
  } else {
    description = String(post.title + post.content);
  }
  if (post.excerpt === "" || !post.excerpt) post.excerpt = description;
  if (post.description === "" || !post.description) post.description = description;
  post.excerpt = cleanText(post.excerpt);
  post.description = cleanText(post.description);
  let img = "";
  if (post.thumbnail !== "") {
    img = post.thumbnail;
  } else if (post.cover) {
    img = post.cover;
  } else {
    const $ = cheerio.load(post.content);
    if ($("img") && $("img").length > 0) {
      $("img").each(function(i) {
        if (i == 0) {
          const imgsrc = $(this).attr("src");
          if (imgsrc) img = imgsrc;
        }
      });
    }
  }
  if (img !== "") {
    post.cover = img;
    post.thumbnail = img;
  }
  if ("config" in post) delete post.config;
  if ("site" in post) delete post.site;
  if ("posts" in post) delete post.posts;
  if ("tags" in post) {
    const names = tagName(post.tags);
    delete post.tags;
    post.tags = names;
  }
  if ("categories" in post) {
    const names = categorieName(post.categories);
    delete post.categories;
    post.categories = names;
  }
  if (!isModified) {
    postData.push(post);
  } else {
    postData[exPostIndex] = post;
  }
  try {
    const map = postData.map((o) => {
      if ("config" in o) delete o.config;
      if ("site" in o) delete o.site;
      return o;
    });
    (0, import_sbg_utility.writefile)(postDataFilePath(hexo), (0, import_sbg_utility.jsonStringifyWithCircularRefs)(map));
  } catch (e) {
    hexo.log.error(logname, "fail write postdata");
    console.trace(e);
  }
}
function cleanText(str) {
  return String(str).replace(/[><"']/gm, "").replace(/\s+/g, " ").substring(0, 200);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  collectorPost,
  getPostData,
  loadPostData,
  postDataFilePath
});
