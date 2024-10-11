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

// src/helper/related-posts.ts
var related_posts_exports = {};
__export(related_posts_exports, {
  getRelatedPosts: () => getRelatedPosts,
  objectArrayIndexOf: () => objectArrayIndexOf
});
module.exports = __toCommonJS(related_posts_exports);
var import_fs_extra2 = __toESM(require("fs-extra"), 1);
var import_lodash = __toESM(require("lodash"), 1);
var import_path = __toESM(require("path"), 1);
var import_sbg_utility2 = require("sbg-utility");

// src/helper/collector.ts
var cheerio = __toESM(require("cheerio"), 1);
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_sbg_utility = require("sbg-utility");

// src/helper/util.ts
var import_ansi_colors = __toESM(require("ansi-colors"), 1);
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
var getPostData = () => postData;

// src/helper/related-posts.ts
var assign = import_lodash.default.assign;
function addCount(array, searchProperty, newProperty) {
  return array.reduce(function(newArray, item) {
    const i = objectArrayIndexOf(newArray, item[searchProperty], searchProperty);
    if (i === -1) {
      item[newProperty] = 1;
      newArray.push(item);
    } else {
      newArray[i][newProperty] = newArray[i][newProperty] + 1;
    }
    return newArray;
  }, []);
}
function objectArrayIndexOf(array, searchTerm, property) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][property] === searchTerm) return i;
  }
  return -1;
}
function dynamicSort(property, isAscending) {
  let sortOrder = -1;
  if (isAscending) sortOrder = 1;
  return function(a, b) {
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
function getRelatedPosts(hexo) {
  var _a;
  const options = (_a = hexo.config.renderers) == null ? void 0 : _a.generator;
  if (Array.isArray(options)) {
    if (!options.includes("related-posts")) return;
  } else {
    return;
  }
  hexo.extend.helper.register(
    "list_related_posts",
    function(options2) {
      var _a2, _b;
      const relatedDb = import_path.default.join(
        hexo.base_dir,
        "tmp/hexo-renderers/related-posts",
        (0, import_sbg_utility2.slugify)((_a2 = this.page) == null ? void 0 : _a2.title),
        "related.json"
      );
      options2 = assign(
        {
          maxCount: 5,
          orderBy: "date",
          isAscending: false,
          pClass: "related-posts-none",
          ulClass: "related-posts",
          liClass: "related-posts-item",
          aClass: "related-posts-link",
          generateAbstract: false,
          abstractClass: "related-posts-item-abstract",
          abstractLength: 110
        },
        options2 || {}
      );
      const orderOption = ["date", "random"];
      if (orderOption.indexOf(options2.orderBy) === -1) {
        options2.orderBy = "date";
      }
      let postList = [];
      if (import_fs_extra2.default.existsSync(relatedDb)) {
        postList = (0, import_sbg_utility2.jsonParseWithCircularRefs)(import_fs_extra2.default.readFileSync(relatedDb, "utf-8"));
      } else {
        const post = this.post || this.page;
        if (post) {
          if ("tags" in post) {
            const tags = post.tags;
            if ("each" in tags) {
              tags.each(function(tag) {
                tag.posts.each(function(post2) {
                  postList.push(post2);
                });
              });
            }
          }
        }
        if (postList.length === 0) {
          const thisPageTags = ((_b = this.page) == null ? void 0 : _b.tags) || [];
          const postData2 = getPostData().filter((post2) => {
            var _a3;
            let tags = [];
            if ((_a3 = post2.tags) == null ? void 0 : _a3.toArray) {
              tags = post2.tags.toArray();
            } else if (post2.tags) {
              tags = post2.tags;
            }
            if (!tags.some) tags = tagName(tags);
            return tags.some((tag) => thisPageTags.includes(tag));
          });
          postList.push(...postData2);
        }
      }
      if (postList.length > 0) {
        postList = addCount(postList, "_id", "count");
        const currentPostIndex = postList.findIndex(
          (post) => {
            var _a3, _b2;
            return post._id === ((_a3 = this.page) == null ? void 0 : _a3._id) || post.title === ((_b2 = this.page) == null ? void 0 : _b2.title);
          }
        );
        if (currentPostIndex !== -1) postList.splice(currentPostIndex, 1);
        if (options2.orderBy === "random") {
          (0, import_sbg_utility2.array_shuffle)(postList);
        } else {
          postList.sort(dynamicSort(options2.orderBy, options2.isAscending));
        }
        postList.sort(dynamicSort("count", false));
        (0, import_sbg_utility2.writefile)(relatedDb, (0, import_sbg_utility2.jsonStringifyWithCircularRefs)(postList));
      }
      return postList;
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRelatedPosts,
  objectArrayIndexOf
});
