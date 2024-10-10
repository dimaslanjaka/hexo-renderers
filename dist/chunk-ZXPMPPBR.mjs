import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  categorieName,
  init_util,
  logname,
  tagName
} from "./chunk-DX3RKJWE.mjs";
import {
  __esm
} from "./chunk-QAIXVEL3.mjs";

// src/helper/collector.ts
import * as cheerio from "cheerio";
import fs from "fs-extra";
import path from "path";
import {
  copyPath,
  file_to_hash,
  jsonParseWithCircularRefs,
  jsonStringifyWithCircularRefs,
  md5,
  writefile
} from "sbg-utility";
function postDataFilePath(hexo) {
  return path.join(hexo.base_dir, "tmp/hexo-renderers/post-data.json");
}
function loadPostData(hexo) {
  const file = postDataFilePath(hexo);
  if (fs.existsSync(file)) {
    try {
      postData = jsonParseWithCircularRefs(fs.readFileSync(file, "utf-8"));
    } catch (e) {
      copyPath(file, path.join(hexo.base_dir, "tmp/hexo-renderers/errors/loadPostData.json"));
      const tag = "fail load post data";
      hexo.log.error(tag, file);
      hexo.log.error(tag, e.message);
    }
  }
}
async function collectorPost(post, hexo) {
  const integrity = post.full_source ? await file_to_hash("sha1", post.full_source, "hex") : md5(String(post.path + post.raw));
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
    writefile(postDataFilePath(hexo), jsonStringifyWithCircularRefs(map));
  } catch (e) {
    hexo.log.error(logname, "fail write postdata");
    console.trace(e);
  }
}
function cleanText(str) {
  return String(str).replace(/[><"']/gm, "").replace(/\s+/g, " ").substring(0, 200);
}
var postData, getPostData;
var init_collector = __esm({
  "src/helper/collector.ts"() {
    init_util();
    postData = [];
    getPostData = () => postData;
  }
});

export {
  postDataFilePath,
  loadPostData,
  getPostData,
  collectorPost,
  init_collector
};
