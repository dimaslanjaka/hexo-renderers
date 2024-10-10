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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  rendererDartSass: () => rendererDartSass,
  rendererEjs: () => rendererEjs,
  rendererMarkdownIt: () => rendererMarkdownIt,
  rendererNunjucks: () => rendererNunjucks,
  rendererPug: () => rendererPug,
  rendererRollup: () => rendererRollup,
  rendererSass: () => rendererSass,
  rendererStylus: () => rendererStylus
});
module.exports = __toCommonJS(src_exports);

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/index.ts
var import_sbg_utility6 = require("sbg-utility");
var import_upath3 = __toESM(require("upath"), 1);

// src/generator/meta.ts
var meta = {
  tags: [],
  posts: [],
  categories: []
};
function metaJsonCreator(hexo2) {
  hexo2.extend.generator.register("meta", function(locals) {
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
function registerCustomGenerator(hexo2, generators) {
  if ("meta" in generators) metaJsonCreator(hexo2);
}

// src/helper/collector.ts
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
function postDataFilePath(hexo2) {
  return import_path.default.join(hexo2.base_dir, "tmp/hexo-renderers/post-data.json");
}
function loadPostData(hexo2) {
  const file = postDataFilePath(hexo2);
  if (import_fs_extra.default.existsSync(file)) {
    try {
      postData = (0, import_sbg_utility.jsonParseWithCircularRefs)(import_fs_extra.default.readFileSync(file, "utf-8"));
    } catch (e) {
      (0, import_sbg_utility.copyPath)(file, import_path.default.join(hexo2.base_dir, "tmp/hexo-renderers/errors/loadPostData.json"));
      const tag = "fail load post data";
      hexo2.log.error(tag, file);
      hexo2.log.error(tag, e.message);
    }
  }
}
var getPostData = () => postData;
async function collectorPost(post, hexo2) {
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
    (0, import_sbg_utility.writefile)(postDataFilePath(hexo2), (0, import_sbg_utility.jsonStringifyWithCircularRefs)(map));
  } catch (e) {
    hexo2.log.error(logname, "fail write postdata");
    console.trace(e);
  }
}
function cleanText(str) {
  return String(str).replace(/[><"']/gm, "").replace(/\s+/g, " ").substring(0, 200);
}

// src/helper/index.ts
var import_fs = __toESM(require("fs"), 1);
var hexoUtil = __toESM(require("hexo-util"), 1);
var import_lodash2 = __toESM(require("lodash"), 1);
var import_module = require("module");
var import_path3 = __toESM(require("path"), 1);
var import_yaml = __toESM(require("yaml"), 1);

// src/helper/date.ts
var import_moize = __toESM(require("moize"), 1);
var import_moment_timezone = __toESM(require("moment-timezone"), 1);
var { isMoment } = import_moment_timezone.default;
var isDate = (value) => typeof value === "object" && value instanceof Date && !isNaN(value.getTime());
function getMoment(date2, lang, timezone) {
  if (date2 == null) date2 = (0, import_moment_timezone.default)();
  if (!isMoment(date2)) date2 = (0, import_moment_timezone.default)(isDate(date2) ? date2 : new Date(date2));
  const toMomentLang = toMomentLocale(lang);
  if (toMomentLang) lang = toMomentLang;
  if (lang) date2 = date2.locale(lang);
  if (timezone) date2 = date2.tz(timezone);
  return date2;
}
function toISOString(date2) {
  if (date2 == null) {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  if (date2 instanceof Date || isMoment(date2)) {
    return date2.toISOString();
  }
  return new Date(date2).toISOString();
}
function dateHelper(date2, format) {
  if (!date2) return "date is undefined";
  const { config: config2 } = this;
  const moment2 = getMoment(date2, getLanguage(this), config2.timezone);
  return moment2.format(format || config2.date_format);
}
function timeHelper(date2, format) {
  if (!date2) return "date is undefined";
  const { config: config2 } = this;
  const moment2 = getMoment(date2, getLanguage(this), config2.timezone);
  return moment2.format(format || config2.time_format);
}
function fullDateHelper(date2, format) {
  if (!date2) return "date is undefined";
  if (format) {
    const moment2 = getMoment(date2, getLanguage(this), this.config.timezone);
    return moment2.format(format);
  }
  return `${this.date(date2)} ${this.time(date2)}`;
}
function relativeDateHelper(date2) {
  if (!date2) return "date is undefined";
  const { config: config2 } = this;
  const moment2 = getMoment(date2, getLanguage(this), config2.timezone);
  return moment2.fromNow();
}
function timeTagHelper(date2, format) {
  if (!date2) return "date is undefined";
  const { config: config2 } = this;
  return `<time datetime="${toISOString(date2)}">${this.date(date2, format, getLanguage(this), config2.timezone)}</time>`;
}
function getLanguage(ctx) {
  return ctx.page.lang || ctx.page.language || ctx.config.language;
}
function toMomentLocales(lang) {
  if (lang === void 0) {
    return void 0;
  }
  if (!lang || lang === "en" || lang === "default") {
    return "en";
  }
  return lang.toLowerCase().replace("_", "-");
}
var date = dateHelper;
var date_xml = toISOString;
var time = timeHelper;
var full_date = fullDateHelper;
var relative_date = relativeDateHelper;
var time_tag = timeTagHelper;
var toMomentLocale = import_moize.default.shallow(toMomentLocales);

// src/helper/getAuthor.ts
function getAuthor(hexo2) {
  hexo2.extend.helper.register("getAuthor", function getAuthor2(author, fallback) {
    if (!author) return fallback;
    const test1 = getTheAuthor(author);
    if (typeof test1 === "string") return test1;
    const test2 = getTheAuthor(this.config.author);
    if (typeof test2 === "string") return test2;
    return "default user";
  });
}
function getTheAuthor(authorObj) {
  if (typeof authorObj === "string") return authorObj;
  if (typeof authorObj.name === "string") return authorObj.name;
  if (typeof authorObj.nick === "string") return authorObj.nick;
  if (typeof authorObj.nickname === "string") return authorObj.nickname;
}

// src/helper/getPostByLabel.ts
function getPostByLabelInternal(by, filternames) {
  const hexo2 = this;
  const data = hexo2.site[by].data;
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
function getPostByLabel(hexo2) {
  hexo2.extend.helper.register("getPostByLabel", getPostByLabelInternal);
}

// src/helper/partial.ts
var path2 = __toESM(require("upath"), 1);
function partialWithLayout(ctx) {
  return function partialWithLayout2(name, locals, options = {}) {
    if (typeof name !== "string") throw new TypeError("argument name must be a string!");
    const { cache } = options;
    const self = this;
    const viewDir = self.view_dir;
    const currentView = self.filename.substring(viewDir.length);
    const thePath = path2.join(path2.dirname(currentView), name);
    const view = ctx.theme.getView(thePath) || ctx.theme.getView(name);
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

// src/helper/related-posts.ts
var import_fs_extra2 = __toESM(require("fs-extra"), 1);
var import_lodash = __toESM(require("lodash"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_sbg_utility2 = require("sbg-utility");
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
function getRelatedPosts(hexo2) {
  var _a2;
  const options = (_a2 = hexo2.config.renderers) == null ? void 0 : _a2.generator;
  if (Array.isArray(options)) {
    if (!options.includes("related-posts")) return;
  } else {
    return;
  }
  hexo2.extend.helper.register(
    "list_related_posts",
    function(options2) {
      var _a3, _b;
      const relatedDb = import_path2.default.join(
        hexo2.base_dir,
        "tmp/hexo-renderers/related-posts",
        (0, import_sbg_utility2.slugify)((_a3 = this.page) == null ? void 0 : _a3.title),
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
            var _a4;
            let tags = [];
            if ((_a4 = post2.tags) == null ? void 0 : _a4.toArray) {
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
            var _a4, _b2;
            return post._id === ((_a4 = this.page) == null ? void 0 : _a4._id) || post.title === ((_b2 = this.page) == null ? void 0 : _b2.title);
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

// src/helper/index.ts
if (typeof require === "undefined") global.require = (0, import_module.createRequire)(importMetaUrl);
var _toArray = import_lodash2.default.toArray;
var BASE_DIR = typeof hexo === "undefined" ? process.cwd() : hexo.base_dir;
var configFile = import_path3.default.join(BASE_DIR, "_config.yml");
var config = {};
if (import_fs.default.existsSync(configFile)) {
  if (typeof hexo === "undefined") {
    config = import_yaml.default.parse(import_fs.default.readFileSync(configFile, "utf-8"));
  } else {
    config = hexo.config;
  }
}
var THEME_LOCATION = import_path3.default.join(process.cwd(), "themes", config.theme || "landscape");
var _THEME_SCRIPTS = import_path3.default.join(THEME_LOCATION, "scripts");
function isObject(value) {
  return typeof value === "object" && value !== null && value !== void 0;
}
function toArray(value) {
  if (isObject(value) && typeof value.toArray === "function") {
    return value.toArray();
  } else if (Array.isArray(value)) {
    return value;
  }
  return _toArray(value);
}
function registerCustomHelper(hexo2) {
  hexo2.extend.helper.register("toArray", toArray);
  hexo2.extend.helper.register("isObject", isObject);
  getRelatedPosts(hexo2);
  getAuthor(hexo2);
  getPostByLabel(hexo2);
  hexo2.extend.helper.register("json_config", function() {
    const hexo3 = this;
    const { config: config2, theme, url_for: url_for2 } = hexo3;
    const theme_config = {
      hostname: new URL(config2.url).hostname || config2.url,
      root: config2.root
    };
    const hexo_config = {
      homepage: url_for2("/")
    };
    return {
      theme: Object.assign(theme, theme_config),
      project: Object.assign(config2, hexo_config)
    };
  });
  hexo2.extend.helper.register("json_data", function(name, ...data) {
    const json = data.length === 1 ? data[0] : Object.assign({}, ...data);
    return `<script class="json-config" data-name="${name}" type="application/json">${JSON.stringify(json).replace(/</g, "\\u003c")}</script>`;
  });
  hexo2.extend.helper.register("getPosts", function getPosts() {
    const page = this["page"];
    return page == null ? void 0 : page.posts;
  });
  hexo2.extend.helper.register("partialWithLayout", partialWithLayout);
  hexo2.extend.helper.register("date", date);
  hexo2.extend.helper.register("date_xml", date_xml);
  hexo2.extend.helper.register("time", time);
  hexo2.extend.helper.register("full_date", full_date);
  hexo2.extend.helper.register("relative_date", relative_date);
  hexo2.extend.helper.register("time_tag", time_tag);
  hexo2.extend.helper.register("moment", import_moment_timezone.default);
  hexo2.extend.helper.register("url_for", hexoUtil.url_for);
  for (const key in hexoUtil) {
    if (Object.prototype.hasOwnProperty.call(hexoUtil, key)) {
      const helper = hexoUtil[key];
      hexo2.extend.helper.register(key, helper);
    }
  }
}

// src/renderer-dartsass.ts
var import_sass = __toESM(require("sass"), 1);
function rendererDartSass(hexo2) {
  const make = function(data, _options) {
    const config2 = Object.assign(this.theme.config.sass || {}, this.config.sass || {}, { file: data.path });
    return new Promise((resolve, reject) => {
      import_sass.default.compileAsync(data.path, config2).then(function(result) {
        resolve(result.css);
      }).catch(reject);
    });
  };
  hexo2.extend.renderer.register("scss", "css", make);
  hexo2.extend.renderer.register("sass", "css", make);
}

// src/renderer-ejs.ts
var ejs = __toESM(require("ejs"), 1);
function rendererEjs(hexo2) {
  if (ejs.filters) ejs.filters.toArray = toArray;
  function ejsRenderer(data, locals) {
    return ejs.render(data.text, Object.assign({ filename: data.path }, locals));
  }
  ejsRenderer.compile = function(data) {
    return ejs.compile(data.text, {
      filename: data.path
    });
  };
  hexo2.extend.renderer.register("ejs", "html", ejsRenderer, true);
}

// src/markdown-it/renderer.ts
var import_cheerio = require("cheerio");
var import_markdown_it = __toESM(require("markdown-it"), 1);
var import_module2 = require("module");
var import_sbg_utility3 = require("sbg-utility");
var import_upath = __toESM(require("upath"), 1);
var import_url = require("url");

// src/markdown-it/anchors.js
var import_hexo_util = __toESM(require("hexo-util"), 1);
var import_token = __toESM(require("markdown-it/lib/token.mjs"), 1);
var renderPermalink = function(slug, opts, tokens, idx) {
  const permalink = [
    Object.assign(new import_token.default("link_open", "a", 1), {
      attrs: [
        ["class", opts.permalinkClass],
        ["href", "#" + slug]
      ]
    }),
    Object.assign(new import_token.default("text", "", 0), {
      content: opts.permalinkSymbol
    }),
    new import_token.default("link_close", "a", -1),
    Object.assign(new import_token.default("text", "", 0), {
      content: ""
    })
  ];
  if (opts.permalinkSide === "right") {
    return tokens[idx + 1].children.push(...permalink);
  }
  return tokens[idx + 1].children.unshift(...permalink);
};
var anchor = function(md, opts) {
  Object.assign(opts, { renderPermalink });
  let titleStore = {};
  const originalHeadingOpen = md.renderer.rules.heading_open;
  const slugOpts = { transform: opts.case, ...opts };
  md.renderer.rules.heading_open = function(...args) {
    const [tokens, idx, _something, _somethingelse, self] = args;
    if (tokens[idx].tag.substr(1) >= opts.level) {
      let _tokens$idx;
      const title = tokens[idx + 1].children.reduce((acc, t) => {
        return acc + t.content;
      }, "");
      let slug = import_hexo_util.default.slugize(title, slugOpts);
      if (Object.prototype.hasOwnProperty.call(titleStore, slug)) {
        titleStore[slug] = titleStore[slug] + 1;
        slug = slug + "-" + opts.collisionSuffix + titleStore[slug].toString();
      } else {
        titleStore[slug] = 1;
      }
      (_tokens$idx = tokens[idx], !_tokens$idx.attrs && (_tokens$idx.attrs = []), _tokens$idx.attrs).push([
        "id",
        slug
      ]);
      if (opts.permalink) {
        opts.renderPermalink.apply(opts, [slug, opts].concat(args));
      }
    }
    return originalHeadingOpen ? originalHeadingOpen.apply(this, args) : self.renderToken.apply(self, args);
  };
  md.core.ruler.push("clear_anchor_title_store", () => {
    titleStore = {};
  });
};
var anchors_default = anchor;

// src/markdown-it/html-tags.js
var validHtmlTags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "body",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
];
var validHtmlTagsRegex = new RegExp("</?(" + validHtmlTags.join("|") + ")(\\s|>)");

// src/markdown-it/images.js
var import_hexo_util2 = __toESM(require("hexo-util"), 1);
var path5 = __toESM(require("path"), 1);
var { basename, dirname: dirname2, extname, isAbsolute, posix, relative } = path5;
var { join: join2, relative: relativePosix } = posix;
function images(md, opts) {
  const { hexo: hexo2, images: images2 } = opts;
  const { lazyload, prepend_root: prependRoot, post_asset: postAsset } = images2;
  const { relative_link, model, base_dir: base_dir2, source_dir } = hexo2;
  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const { postPath } = env;
    if (lazyload) {
      token.attrSet("loading", "lazy");
    }
    if (!prependRoot && !postAsset) {
      return self.renderToken(tokens, idx, options);
    }
    const srcIdx = token.attrs.findIndex((attr) => attr[0] === "src");
    let src = token.attrs[srcIdx][1];
    if (!/^(#|\/\/|http(s)?:)/.test(src) && !relative_link) {
      if (!(src.startsWith("/") || src.startsWith("\\")) && postAsset) {
        const PostAsset = model.call(hexo2, "PostAsset");
        let assetDirBasePath = join2(
          basename(source_dir),
          dirname2(relativePosix(source_dir, postPath)),
          basename(postPath, extname(postPath))
        );
        if (isAbsolute(assetDirBasePath)) assetDirBasePath = relative(base_dir2, assetDirBasePath);
        assetDirBasePath = assetDirBasePath.replace(/\\/g, "/");
        const asset = [
          join2(assetDirBasePath, src),
          join2(assetDirBasePath, src.replace(new RegExp("^" + basename(postPath, extname(postPath)) + "/"), ""))
        ].map((id) => PostAsset.findById(id)).filter(Boolean);
        if (asset.length) {
          src = asset[0].path.replace(/\\/g, "/");
        }
      }
      token.attrSet("src", import_hexo_util2.default.url_for.call(hexo2, src));
    }
    return self.renderToken(tokens, idx, options);
  };
}
var images_default = images;

// src/markdown-it/renderer.ts
var __filename2 = (0, import_url.fileURLToPath)(importMetaUrl);
var __dirname = import_upath.default.dirname(__filename2);
if (typeof require === "undefined") global.require = (0, import_module2.createRequire)(importMetaUrl);
var escapeHtml = (str) => {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};
var Renderer = class {
  /**
   * constructor
   *
   * @param hexo context of hexo
   */
  constructor(hexo2) {
    this.hexo = hexo2;
    let { markdown } = hexo2.config;
    if (typeof markdown === "string") {
      markdown = {
        preset: markdown
      };
      hexo2.log.warn(
        `Deprecated config detected. Please use

markdown:
  preset: ${markdown.preset}

See https://github.com/hexojs/hexo-renderer-markdown-it#options`
      );
    }
    const { preset, render: render2, enable_rules, disable_rules, plugins, anchors, images: images2 } = markdown;
    this.parser = new import_markdown_it.default(preset, render2);
    if (enable_rules) {
      this.parser.enable(enable_rules);
    }
    if (disable_rules) {
      this.parser.disable(disable_rules);
    }
    if (plugins) {
      this.parser = plugins.reduce((parser, pugs) => {
        if (pugs instanceof Object && pugs.name) {
          const resolved = require.resolve(pugs.name, {
            paths: [
              hexo2.base_dir,
              import_upath.default.join(hexo2.base_dir, "node_modules"),
              import_upath.default.join(__dirname, "../../"),
              import_upath.default.join(__dirname, "../../node_modules")
            ]
          });
          return parser.use(require(resolved), pugs.options);
        } else if (typeof pugs === "string") {
          return parser.use(require(pugs));
        } else {
          return parser.use(require(require.resolve(pugs.name)), pugs.options);
        }
      }, this.parser);
    }
    if (anchors) {
      this.parser.use(anchors_default, anchors);
    }
    if (images2) {
      this.parser.use(images_default, {
        images: images2,
        hexo: this.hexo
      });
    }
    this.disableNunjucks = false;
  }
  render(data, _options) {
    this.hexo.execFilterSync("markdown-it:renderer", this.parser, { context: this });
    let html = this.parser.render(data.text, {
      postPath: data.path
    });
    const $ = (0, import_cheerio.load)(html);
    const regexs = [];
    $("*").each((index, element) => {
      const tagName2 = element.tagName.toLowerCase();
      if (!validHtmlTags.includes(tagName2)) {
        const regex = new RegExp("</?" + tagName2 + ">", "gm");
        regexs.push(regex);
      } else if (tagName2 === "img" || tagName2 === "source" || tagName2 === "iframe") {
        const src = $(element).attr("src");
        if (src && !(0, import_sbg_utility3.isValidHttpUrl)(src) && !src.startsWith(this.hexo.config.root)) {
          const finalSrc = import_upath.default.join(this.hexo.config.root, src);
          this.hexo.log.info("fix PAF", src, "->", finalSrc);
          html = html.replace(new RegExp((0, import_sbg_utility3.escapeRegex)(src)), finalSrc);
        }
      }
    });
    const results = regexs.map((regex) => {
      const result = html.match(regex);
      if (typeof hexo != "undefined") {
        hexo.log.info("found invalid html tags inside anchor", regex, result);
      }
      return { regex, result };
    });
    const matches = results.flat();
    for (let i = 0; i < matches.length; i++) {
      const regex_result = matches[i];
      if (regex_result.result) {
        for (let i2 = 0; i2 < regex_result.result.length; i2++) {
          const replacement = escapeHtml(regex_result.result[i2]);
          html = html.replace(regex_result.regex, replacement);
        }
      }
    }
    return html;
  }
};
var renderer_default = Renderer;

// src/renderer-markdown-it.ts
var defaultMarkdownOptions = {
  preset: "default",
  render: {
    html: true,
    xhtmlOut: false,
    langPrefix: "language-",
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: "\u201C\u201D\u2018\u2019"
  },
  enable_rules: null,
  disable_rules: null,
  plugins: [
    "markdown-it-abbr",
    "markdown-it-attrs",
    "markdown-it-bracketed-spans",
    "markdown-it-sup",
    "markdown-it-cjk-breaks",
    "markdown-it-sub",
    "markdown-it-deflist",
    "markdown-it-footnote",
    "markdown-it-ins",
    "markdown-it-mark",
    {
      name: "markdown-it-emoji",
      options: {
        shortcuts: {
          laughing: ":D"
        }
      }
    }
  ],
  anchors: {
    level: 2,
    collisionSuffix: "",
    permalink: false,
    permalinkClass: "header-anchor",
    permalinkSide: "left",
    permalinkSymbol: "\xB6",
    case: 0,
    separator: "-"
  },
  images: {
    lazyload: false,
    prepend_root: false,
    post_asset: false
  }
};
function rendererMarkdownIt(hexo2) {
  hexo2.config.markdown = Object.assign(
    {
      preset: "default",
      render: {},
      anchors: {}
    },
    defaultMarkdownOptions,
    // fallback to empty object when `markdown` options is undefined
    hexo2.config.markdown || {}
  );
  hexo2.config.markdown.render = Object.assign(
    {
      html: true,
      xhtmlOut: false,
      breaks: true,
      linkify: true,
      typographer: true,
      quotes: "\u201C\u201D\u2018\u2019"
    },
    hexo2.config.markdown.render || {}
  );
  hexo2.config.markdown.anchors = Object.assign(
    {
      level: 2,
      collisionSuffix: "",
      permalink: false,
      permalinkClass: "header-anchor",
      permalinkSide: "left",
      permalinkSymbol: "\xB6",
      case: 0,
      separator: "-"
    },
    hexo2.config.markdown.anchors || {}
  );
  const renderer2 = new renderer_default(hexo2);
  if (typeof hexo2.config.markdown.disableNunjucks !== "boolean") {
    renderer2.disableNunjucks = hexo2.config.markdown.disableNunjucks === "true";
  }
  function render2(data, options = {}) {
    return renderer2.render(data, options);
  }
  hexo2.extend.renderer.register("md", "html", render2, true);
  hexo2.extend.renderer.register("markdown", "html", render2, true);
  hexo2.extend.renderer.register("mkd", "html", render2, true);
  hexo2.extend.renderer.register("mkdn", "html", render2, true);
  hexo2.extend.renderer.register("mdwn", "html", render2, true);
  hexo2.extend.renderer.register("mdtxt", "html", render2, true);
  hexo2.extend.renderer.register("mdtext", "html", render2, true);
  return render2;
}

// src/renderer-nunjucks.ts
var import_fs_extra3 = __toESM(require("fs-extra"), 1);
var import_nunjucks = __toESM(require("nunjucks"), 1);
var import_upath2 = __toESM(require("upath"), 1);
var import_sbg_utility4 = require("sbg-utility");
var base_dir = typeof hexo !== "undefined" && hexo.base_dir ? hexo.base_dir : process.cwd();
var tmpdir = import_upath2.default.join(base_dir, "tmp", "hexo-renderers");
var logfile = import_upath2.default.join(tmpdir, "nunjucks-log.json");
function rendererNunjucks(hexo2) {
  const themeDir = import_upath2.default.join(hexo2.base_dir, "themes", hexo2.config.theme);
  const env = import_nunjucks.default.configure([themeDir, import_upath2.default.join(themeDir, "layout")], {
    noCache: true,
    autoescape: false,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false
  });
  env.addFilter("toArray", toArray);
  const logs = {
    render: [],
    compile: []
  };
  function render2(data, locals) {
    if ("text" in data) {
      return import_nunjucks.default.renderString(data.text, locals);
    }
    logs.render.push(data.path);
    (0, import_sbg_utility4.writefile)(logfile, JSON.stringify(logs, null, 2));
    return import_nunjucks.default.render(data.path, locals);
  }
  function compile3(data) {
    logs.compile.push(data.path);
    (0, import_sbg_utility4.writefile)(logfile, JSON.stringify(logs, null, 2));
    const compiled = import_nunjucks.default.compile(
      "text" in data ? data.text : import_fs_extra3.default.readFileSync(data.path, "utf-8"),
      env
    );
    return compiled.render.bind(compiled);
  }
  render2.compile = compile3;
  hexo2.extend.renderer.register("njk", "html", render2, false);
  hexo2.extend.renderer.register("j2", "html", render2, false);
  return { render: render2, rendererNunjucks, compile: compile3 };
}

// src/renderer-pug.ts
var import_module3 = require("module");
var path8 = __toESM(require("path"), 1);
var pug = __toESM(require("pug"), 1);
if (typeof require === "undefined") global.require = (0, import_module3.createRequire)(importMetaUrl);
function rendererPug(hexo2) {
  const configPath = path8.join(process.cwd(), "pug.config");
  const defaultConfig = { compile: {} };
  let hasConfig = true;
  try {
    require.resolve(configPath);
  } catch {
    hasConfig = false;
  }
  const config2 = hasConfig ? require(configPath) : defaultConfig;
  const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  const invalidKeys = Object.keys(config2).filter((k) => !hasProp(defaultConfig, k));
  if (invalidKeys.length > 0) {
    throw Error(`Unsupported PUG config keys: ${invalidKeys.join(", ")}`);
  }
  function pugCompile(data) {
    const opts = {
      ...config2.compile,
      filename: data.path
      // always used
    };
    return pug.compile(data.text, opts);
  }
  function pugRenderer(data, locals) {
    return pugCompile(data)(locals);
  }
  pugRenderer.compile = pugCompile;
  hexo2.extend.renderer.register("pug", "html", pugRenderer, true);
  return pugRenderer;
}

// src/renderer-sass.ts
var import_node_sass = __toESM(require("node-sass"), 1);
var import_path4 = __toESM(require("path"), 1);
var extend = Object.assign;
var sassRenderer = (ext) => function(data) {
  const userConfig = extend(this.theme.config.node_sass || {}, this.config.node_sass || {});
  const config2 = extend(
    {
      data: data.text,
      file: data.path,
      outputStyle: "nested",
      sourceComments: false,
      indentedSyntax: ext === "sass"
    },
    userConfig
  );
  if (typeof config2.includePaths === "string") {
    config2.includePaths = [config2.includePaths];
  } else if (!config2.includePaths) {
    config2.includePaths = [];
  }
  config2.includePaths.push(
    import_path4.default.join(hexo.base_dir, "node_modules"),
    import_path4.default.join(hexo.theme_dir, "node_modules")
  );
  try {
    const result = import_node_sass.default.renderSync(config2);
    return Promise.resolve(result.css.toString());
  } catch (error) {
    console.error(error.toString());
    throw error;
  }
};
function rendererSass(hexo2) {
  hexo2.extend.renderer.register("scss", "css", sassRenderer("scss"));
  hexo2.extend.renderer.register("sass", "css", sassRenderer("sass"));
}

// src/renderer-stylus.ts
var import_module4 = require("module");
var import_stylus = __toESM(require("stylus"), 1);
if (typeof require === "undefined") global.require = (0, import_module4.createRequire)(importMetaUrl);
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
    const factoryFn = require(plugin.trim());
    stylusConfig.use(factoryFn());
  });
}
function stylusFn(data, options, callback) {
  const self = this;
  const config2 = self.config.stylus || {};
  const plugins = ["nib"].concat(config2.plugins || []);
  function defineConfig(style) {
    style.define("hexo-config", (data2) => {
      return getProperty(self.theme.config, data2.val);
    });
  }
  const stylusConfig = (0, import_stylus.default)(data.text);
  applyPlugins(stylusConfig, plugins);
  stylusConfig.use(defineConfig).use((style) => self.execFilterSync("stylus:renderer", style, { context: this })).set("filename", data.path).set("sourcemap", config2.sourcemaps).set("compress", config2.compress).set("include css", true).render(callback);
}
stylusFn.disableNunjucks = true;
function rendererStylus(hexo2) {
  hexo2.extend.renderer.register("styl", "css", stylusFn);
  hexo2.extend.renderer.register("stylus", "css", stylusFn);
}

// src/renderer/rollup/renderer.js
var import_path5 = require("path");
var import_rollup = require("rollup");
var import_sbg_utility5 = require("sbg-utility");

// src/renderer/rollup/utils/createReadFilterProxy.js
var createReadFilterProxy = (target, filters2 = {}) => {
  if (target == null || typeof target !== "object") {
    throw new TypeError();
  }
  let filterKeys = Object.keys(filters2).filter((key) => typeof filters2[key] === "function");
  if (!filterKeys) {
    return target;
  }
  const filtersMap = filterKeys.reduce((result, key) => {
    result[key] = filters2[key];
    return result;
  }, /* @__PURE__ */ Object.create(null));
  filters2 = null;
  filterKeys = null;
  return new Proxy(target, {
    get(target2, property, receiver) {
      const original = Reflect.get(target2, property, receiver);
      return property in filtersMap ? filtersMap[property](original, target2) : original;
    }
  });
};
var createReadFilterProxy_default = createReadFilterProxy;

// src/renderer/rollup/utils/objectWithoutKeys.ts
var objectWithoutKeys = (obj, keys) => {
  if (!Array.isArray(keys)) {
    throw new TypeError("keys most string[].");
  }
  return Object.keys(obj).reduce(
    (newObject, key) => {
      if (!keys.includes(key)) newObject[key] = obj[key];
      return newObject;
    },
    {}
  );
};

// src/renderer/rollup/utils/rollupPluginFromName.js
var import_module5 = require("module");
if (typeof require === "undefined") global.require = (0, import_module5.createRequire)(importMetaUrl);
var rollupPluginFromName = (name) => {
  if (typeof name !== "string") {
    throw new TypeError("name most string");
  }
  const pluginPrefix = "rollup-plugin-";
  if (!name.startsWith(pluginPrefix)) {
    name = pluginPrefix + name;
  }
  return require(name);
};
var rollupPluginFromName_default = rollupPluginFromName;

// src/renderer/rollup/utils/createRollupPlugin.js
var createRollupPlugin = (config2) => {
  if (typeof config2 === "string") {
    return rollupPluginFromName_default(config2)({});
  }
  if (typeof config2 === "object" && "name" in config2) {
    const plugin = rollupPluginFromName_default(config2.name);
    const options = objectWithoutKeys(config2, ["name"]);
    return plugin(options);
  }
  throw new TypeError("config most object!");
};
var createRollupPlugin_default = createRollupPlugin;

// src/renderer/rollup/utils/getHexoConfigs.js
var mostHexoTypeError = () => {
  throw new TypeError("ctx most Hexo instance!");
};
var getRawSiteConfig = (name, ctx) => {
  if (!ctx) {
    mostHexoTypeError();
  }
  return ctx.config[name];
};
var getRawThemeConfig = (name, ctx) => {
  if (!ctx) {
    mostHexoTypeError();
  }
  return ctx.theme.config[name];
};
var getRawOverrideThemeConfig = (name, ctx) => {
  if (!ctx) {
    mostHexoTypeError();
  }
  if (ctx.config.theme_config == null) {
    return void 0;
  }
  return ctx.config.theme_config[name];
};

// src/renderer/rollup/utils/toAbsolutePaths.js
var path10 = __toESM(require("path"), 1);

// src/renderer/rollup/utils/objectMap.js
var objectMap = (obj, callback, thisArg = void 0) => {
  if (obj == null) {
    throw new TypeError();
  }
  if (Array.isArray(obj)) {
    return obj.map(callback, thisArg);
  }
  const type = typeof obj;
  if (type !== "object" && type !== "string") {
    throw new TypeError();
  }
  if (typeof obj[Symbol.iterator] === "function") {
    return Array.from(obj, callback, thisArg);
  }
  if (typeof obj.length === "number") {
    return Array.from(obj, callback, thisArg);
  }
  return Object.values(obj).map(callback, thisArg);
};
var objectMap_default = objectMap;

// src/renderer/rollup/utils/toAbsolutePaths.js
var toAbsolutePath = (targets, base) => {
  if (targets == null) {
    return [];
  }
  if (typeof targets === "string") {
    if (path10.isAbsolute(targets)) {
      return targets;
    }
    return path10.join(base, targets);
  }
  return objectMap_default(targets, (x) => {
    return path10.isAbsolute(x) ? x : path10.join(base, x);
  });
};
var toAbsolutePaths_default = toAbsolutePath;

// src/renderer/rollup/HexoRollupConfigs.ts
var configFilterProxy = (config2, baseDir) => {
  if (config2 == null) {
    return config2;
  }
  return createReadFilterProxy_default(config2, {
    input(original, target) {
      return "input" in target ? toAbsolutePaths_default(original, baseDir) : original;
    },
    plugins(original, target) {
      if (!("plugins" in target)) {
        return original;
      }
      if (Array.isArray(original)) {
        return original.map((plugin) => createRollupPlugin_default(plugin));
      }
      return createRollupPlugin_default(original);
    }
  });
};
var reduceStrings = (array) => {
  const initial = [];
  return array.reduce((array2, item) => {
    if (typeof item === "string") {
      array2.push(item);
    } else if (Array.isArray(item)) {
      array2 = array2.concat(item);
    } else if (typeof item === "object") {
      array2 = array2.concat(Array.from(Object.values(item)));
    }
    return array2;
  }, initial);
};
var HexoRollupConfigs = class {
  constructor(ctx) {
    this.ctx = ctx;
  }
  site() {
    const raw = getRawSiteConfig("rollup", this.ctx);
    return configFilterProxy(raw, this.ctx.base_dir);
  }
  theme() {
    const raw = getRawThemeConfig("rollup", this.ctx);
    return configFilterProxy(raw, this.ctx.theme_dir);
  }
  overrideTheme() {
    const raw = getRawOverrideThemeConfig("rollup", this.ctx);
    return configFilterProxy(raw, this.ctx.base_dir);
  }
  merged() {
    const site = this.site();
    const theme = this.theme();
    const override = this.overrideTheme();
    const hexo2 = this.ctx;
    const _default = {
      output: {
        format: "esm"
      },
      onwarn(warning) {
        hexo2.log.warn(warning);
      }
    };
    const input = reduceStrings(
      [site, theme, override].filter((config2) => config2 != null && "input" in config2).map((config2) => config2.input)
    );
    return Object.assign(_default, site, theme, override, { input });
  }
};

// src/renderer/rollup/renderer.js
var rollupCache = [];
var rollupRenderAsync = async (config2) => {
  config2.input.cache = rollupCache;
  const bundle = await (0, import_rollup.rollup)(config2.input);
  rollupCache = bundle.cache;
  const { code } = await bundle.generate(config2.output);
  return code;
};
async function renderer(data, _options) {
  const { path: path12, text } = data;
  const hexo2 = this;
  const rollupConfigs = new HexoRollupConfigs(hexo2);
  const config2 = rollupConfigs.merged();
  if (config2.experimentalCodeSplitting) {
    throw new Error('hexo-renderer-rollup not Support "experimentalCodeSplitting".');
  }
  if (!config2.input.includes(path12)) {
    return text;
  }
  config2.input = path12;
  const input = objectWithoutKeys(config2, ["output"]);
  const { output } = config2;
  (0, import_sbg_utility5.writefile)((0, import_path5.join)(hexo2.base_dir, "tmp/config/rollup.json"), (0, import_sbg_utility5.jsonStringifyWithCircularRefs)({ input, output, path: path12 }));
  try {
    return await rollupRenderAsync({ input, output });
  } catch (err) {
    this.log.error(err);
    throw err;
  }
}
var renderer_default2 = renderer;

// src/renderer/rollup/index.ts
function rendererRollup(hexo2) {
  hexo2.extend.renderer.register("js", "js", renderer_default2);
  hexo2.extend.renderer.register("mjs", "js", renderer_default2);
}

// src/index.ts
var _a;
if (typeof hexo !== "undefined") {
  global.hexo = hexo;
  const options = Object.assign(
    { generator: ["meta"], engines: [] },
    ((_a = hexo.config.renderers) == null ? void 0 : _a.generator) || {}
  );
  if (Array.isArray(hexo.config.renderers)) {
    options.engines = hexo.config.renderers;
  }
  hexo.extend.filter.register("after_init", function() {
    loadPostData(this);
  });
  hexo.extend.filter.register("after_clean", function() {
    return (0, import_sbg_utility6.del)(import_upath3.default.join(hexo.base_dir, "tmp/hexo-renderers"));
  });
  registerCustomHelper(hexo);
  registerCustomGenerator(hexo, options.generator);
  hexo.extend.filter.register("after_post_render", function(post) {
    return collectorPost(post, this);
  });
  if (options.engines.length > 0) {
    for (let i = 0; i < options.engines.length; i++) {
      const engine = options.engines[i];
      switch (engine) {
        case "ejs":
          rendererEjs(hexo);
          break;
        case "pug":
          rendererPug(hexo);
          break;
        case "dartsass":
          rendererDartSass(hexo);
          break;
        case "rollup":
          rendererRollup(hexo);
          break;
        case "sass":
          rendererSass(hexo);
          break;
        case "stylus":
          rendererStylus(hexo);
          break;
        case "nunjucks":
        case "njk":
          rendererNunjucks(hexo);
          break;
        case "markdown-it":
          rendererMarkdownIt(hexo);
          break;
      }
    }
  } else {
    hexo.log.info(logname, "activating all engines");
    rendererNunjucks(hexo);
    rendererEjs(hexo);
    rendererPug(hexo);
    rendererStylus(hexo);
    rendererSass(hexo);
    rendererMarkdownIt(hexo);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rendererDartSass,
  rendererEjs,
  rendererMarkdownIt,
  rendererNunjucks,
  rendererPug,
  rendererRollup,
  rendererSass,
  rendererStylus
});
