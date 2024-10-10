import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  getPostData,
  init_collector
} from "./chunk-ZXPMPPBR.mjs";
import {
  init_util,
  tagName
} from "./chunk-DX3RKJWE.mjs";
import {
  __esm
} from "./chunk-QAIXVEL3.mjs";

// src/helper/related-posts.ts
import fs from "fs-extra";
import lodash from "lodash";
import path from "path";
import {
  array_shuffle,
  jsonParseWithCircularRefs,
  jsonStringifyWithCircularRefs,
  slugify,
  writefile
} from "sbg-utility";
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
      const relatedDb = path.join(
        hexo.base_dir,
        "tmp/hexo-renderers/related-posts",
        slugify((_a2 = this.page) == null ? void 0 : _a2.title),
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
      if (fs.existsSync(relatedDb)) {
        postList = jsonParseWithCircularRefs(fs.readFileSync(relatedDb, "utf-8"));
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
          const postData = getPostData().filter((post2) => {
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
          postList.push(...postData);
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
          array_shuffle(postList);
        } else {
          postList.sort(dynamicSort(options2.orderBy, options2.isAscending));
        }
        postList.sort(dynamicSort("count", false));
        writefile(relatedDb, jsonStringifyWithCircularRefs(postList));
      }
      return postList;
    }
  );
}
var assign;
var init_related_posts = __esm({
  "src/helper/related-posts.ts"() {
    init_collector();
    init_util();
    assign = lodash.assign;
  }
});

export {
  objectArrayIndexOf,
  getRelatedPosts,
  init_related_posts
};
