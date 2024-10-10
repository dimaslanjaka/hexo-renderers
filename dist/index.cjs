"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// src/helper/date.ts
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
var import_moize, import_moment_timezone, isMoment, isDate, date, date_xml, time, full_date, relative_date, time_tag, toMomentLocale;
var init_date = __esm({
  "src/helper/date.ts"() {
    "use strict";
    import_moize = __toESM(require("moize"));
    import_moment_timezone = __toESM(require("moment-timezone"));
    ({ isMoment } = import_moment_timezone.default);
    isDate = (value) => typeof value === "object" && value instanceof Date && !isNaN(value.getTime());
    date = dateHelper;
    date_xml = toISOString;
    time = timeHelper;
    full_date = fullDateHelper;
    relative_date = relativeDateHelper;
    time_tag = timeTagHelper;
    toMomentLocale = import_moize.default.shallow(toMomentLocales);
  }
});

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
var init_getAuthor = __esm({
  "src/helper/getAuthor.ts"() {
    "use strict";
  }
});

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
var init_getPostByLabel = __esm({
  "src/helper/getPostByLabel.ts"() {
    "use strict";
  }
});

// src/helper/partial.ts
function partialWithLayout(ctx) {
  return function partialWithLayout2(name, locals, options = {}) {
    if (typeof name !== "string") throw new TypeError("argument name must be a string!");
    const { cache } = options;
    const self = this;
    const viewDir = self.view_dir;
    const currentView = self.filename.substring(viewDir.length);
    const path7 = (0, import_upath.join)((0, import_upath.dirname)(currentView), name);
    const view = ctx.theme.getView(path7) || ctx.theme.getView(name);
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
var import_upath;
var init_partial = __esm({
  "src/helper/partial.ts"() {
    "use strict";
    import_upath = require("upath");
  }
});

// src/helper/util.ts
var import_ansi_colors, categorieName, tagName, logname;
var init_util = __esm({
  "src/helper/util.ts"() {
    "use strict";
    import_ansi_colors = __toESM(require("ansi-colors"));
    categorieName = (inCategories) => {
      if (!inCategories) return [];
      if (typeof inCategories.data[0] === "string") return inCategories;
      let catName = "";
      for (let r = 0; r < inCategories.data.length; r++) {
        if (catName != "") catName += " > ";
        catName += inCategories.data[r].name;
      }
      return catName;
    };
    tagName = (inTags) => {
      if (!inTags || !Array.isArray(inTags.data)) return [];
      if (typeof inTags.data[0] === "string") return inTags;
      const retTags = [];
      inTags.data.forEach((item) => {
        retTags.push(item.name);
      });
      return retTags;
    };
    logname = import_ansi_colors.default.magentaBright("hexo-renderers");
  }
});

// src/helper/collector.ts
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
var cheerio, import_fs_extra, import_path, import_sbg_utility, postData, getPostData;
var init_collector = __esm({
  "src/helper/collector.ts"() {
    "use strict";
    cheerio = __toESM(require("cheerio"));
    import_fs_extra = __toESM(require("fs-extra"));
    import_path = __toESM(require("path"));
    import_sbg_utility = require("sbg-utility");
    init_util();
    postData = [];
    getPostData = () => postData;
  }
});

// src/helper/related-posts.ts
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
var import_fs_extra2, import_lodash, import_path2, import_sbg_utility2, assign;
var init_related_posts = __esm({
  "src/helper/related-posts.ts"() {
    "use strict";
    import_fs_extra2 = __toESM(require("fs-extra"));
    import_lodash = __toESM(require("lodash"));
    import_path2 = __toESM(require("path"));
    import_sbg_utility2 = require("sbg-utility");
    init_collector();
    init_util();
    assign = import_lodash.default.assign;
  }
});

// src/helper/index.ts
var helper_exports = {};
__export(helper_exports, {
  BASE_DIR: () => BASE_DIR,
  registerCustomHelper: () => registerCustomHelper
});
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
var import_fs, hexoUtil, import_lodash2, import_path3, import_yaml, _toArray, BASE_DIR, configFile, config, THEME_LOCATION, _THEME_SCRIPTS;
var init_helper = __esm({
  "src/helper/index.ts"() {
    "use strict";
    import_fs = __toESM(require("fs"));
    hexoUtil = __toESM(require("hexo-util"));
    import_lodash2 = __toESM(require("lodash"));
    import_path3 = __toESM(require("path"));
    import_yaml = __toESM(require("yaml"));
    init_date();
    init_getAuthor();
    init_getPostByLabel();
    init_partial();
    init_related_posts();
    _toArray = import_lodash2.default.toArray;
    BASE_DIR = typeof hexo === "undefined" ? process.cwd() : hexo.base_dir;
    configFile = import_path3.default.join(BASE_DIR, "_config.yml");
    config = {};
    if (import_fs.default.existsSync(configFile)) {
      if (typeof hexo === "undefined") {
        config = import_yaml.default.parse(import_fs.default.readFileSync(configFile).toString());
      } else {
        config = hexo.config;
      }
    }
    THEME_LOCATION = import_path3.default.join(process.cwd(), "themes", config.theme || "landscape");
    _THEME_SCRIPTS = import_path3.default.join(THEME_LOCATION, "scripts");
  }
});

// src/renderer-ejs.js
var require_renderer_ejs = __commonJS({
  "src/renderer-ejs.js"(exports2, module2) {
    "use strict";
    var ejs = require("ejs");
    var { toArray: toArray2 } = (init_helper(), __toCommonJS(helper_exports));
    function rendererEjs2(hexo2) {
      if (ejs.filters) ejs.filters.toArray = toArray2;
      function ejsRenderer(data, locals) {
        return ejs.render(
          data.text,
          Object.assign({ filename: data.path }, locals)
        );
      }
      ejsRenderer.compile = function(data) {
        return ejs.compile(data.text, {
          filename: data.path
        });
      };
      hexo2.extend.renderer.register("ejs", "html", ejsRenderer, true);
    }
    module2.exports = { rendererEjs: rendererEjs2 };
  }
});

// src/markdown-it/anchors.js
var require_anchors = __commonJS({
  "src/markdown-it/anchors.js"(exports2, module2) {
    "use strict";
    var Token = require("markdown-it/lib/token");
    var { slugize } = require("hexo-util");
    var renderPermalink = function(slug, opts, tokens, idx) {
      const permalink = [
        Object.assign(new Token("link_open", "a", 1), {
          attrs: [
            ["class", opts.permalinkClass],
            ["href", "#" + slug]
          ]
        }),
        Object.assign(new Token("text", "", 0), {
          content: opts.permalinkSymbol
        }),
        new Token("link_close", "a", -1),
        Object.assign(new Token("text", "", 0), {
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
          let slug = slugize(title, slugOpts);
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
    module2.exports = anchor;
  }
});

// src/markdown-it/html-tags.js
var require_html_tags = __commonJS({
  "src/markdown-it/html-tags.js"(exports2, module2) {
    "use strict";
    var validHtmlTags2 = [
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
    var validHtmlTagsRegex = new RegExp("</?(" + validHtmlTags2.join("|") + ")(\\s|>)");
    module2.exports = { validHtmlTags: validHtmlTags2, validHtmlTagsRegex };
  }
});

// src/markdown-it/images.js
var require_images = __commonJS({
  "src/markdown-it/images.js"(exports2, module2) {
    "use strict";
    var { join: join3, relative: relativePosix } = require("path").posix;
    var { relative, basename, extname, dirname: dirname2, isAbsolute } = require("path");
    var { url_for: url_for2 } = require("hexo-util");
    function images(md, opts) {
      const { hexo: hexo2, images: images2 } = opts;
      const { lazyload, prepend_root: prependRoot, post_asset: postAsset } = images2;
      const { relative_link, model, base_dir, source_dir } = hexo2;
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
            let assetDirBasePath = join3(
              basename(source_dir),
              dirname2(relativePosix(source_dir, postPath)),
              basename(postPath, extname(postPath))
            );
            if (isAbsolute(assetDirBasePath)) assetDirBasePath = relative(base_dir, assetDirBasePath);
            assetDirBasePath = assetDirBasePath.replace(/\\/g, "/");
            const asset = [
              join3(assetDirBasePath, src),
              join3(assetDirBasePath, src.replace(new RegExp("^" + basename(postPath, extname(postPath)) + "/"), ""))
            ].map((id) => PostAsset.findById(id)).filter(Boolean);
            if (asset.length) {
              src = asset[0].path.replace(/\\/g, "/");
            }
          }
          token.attrSet("src", url_for2.call(hexo2, src));
        }
        return self.renderToken(tokens, idx, options);
      };
    }
    module2.exports = images;
  }
});

// src/renderer-nunjucks.js
var require_renderer_nunjucks = __commonJS({
  "src/renderer-nunjucks.js"(exports2, module2) {
    "use strict";
    var nunjucks = require("nunjucks");
    var fs4 = require("fs-extra");
    var path7 = require("upath");
    var { toArray: toArray2 } = (init_helper(), __toCommonJS(helper_exports));
    var { writefile: writefile3 } = require("sbg-utility");
    var tmpdir = path7.join(__dirname, "../tmp");
    var logfile = path7.join(tmpdir, "nunjucks-log.json");
    function rendererNunjucks2(hexo2) {
      const themeDir = path7.join(hexo2.base_dir, "themes", hexo2.config.theme);
      const env = nunjucks.configure([themeDir, path7.join(themeDir, "layout")], {
        noCache: true,
        autoescape: false,
        throwOnUndefined: false,
        trimBlocks: false,
        lstripBlocks: false
      });
      env.addFilter("toArray", toArray2);
      const logs = {
        render: [],
        compile: []
      };
      function render(data, locals) {
        if ("text" in data) {
          return nunjucks.renderString(data.text, locals);
        }
        logs.render.push(data.path);
        writefile3(logfile, JSON.stringify(logs, null, 2));
        return nunjucks.render(data.path, locals);
      }
      function compile(data) {
        logs.compile.push(data.path);
        writefile3(logfile, JSON.stringify(logs, null, 2));
        const compiled = nunjucks.compile("text" in data ? data.text : fs4.readFileSync(data.path), env);
        return compiled.render.bind(compiled);
      }
      render.compile = compile;
      hexo2.extend.renderer.register("njk", "html", render, false);
      hexo2.extend.renderer.register("j2", "html", render, false);
      return { render, rendererNunjucks: rendererNunjucks2, compile };
    }
    module2.exports = { rendererNunjucks: rendererNunjucks2 };
  }
});

// src/renderer-pug.js
var require_renderer_pug = __commonJS({
  "src/renderer-pug.js"(exports2, module2) {
    "use strict";
    var path7 = require("path");
    var pug = require("pug");
    function rendererPug2(hexo2) {
      const configPath = path7.join(process.cwd(), "pug.config");
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
    module2.exports = { rendererPug: rendererPug2 };
  }
});

// src/renderer-stylus.js
var require_renderer_stylus = __commonJS({
  "src/renderer-stylus.js"(exports2, module2) {
    "use strict";
    var stylus = require("stylus");
    function getProperty(obj, name) {
      name = name.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "");
      const split = name.split(".");
      let key = split.shift();
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
      let self = this;
      const config2 = self.config.stylus || {};
      const plugins = ["nib"].concat(config2.plugins || []);
      function defineConfig(style) {
        style.define("hexo-config", (data2) => {
          return getProperty(self.theme.config, data2.val);
        });
      }
      const stylusConfig = stylus(data.text);
      applyPlugins(stylusConfig, plugins);
      stylusConfig.use(defineConfig).use((style) => self.execFilterSync("stylus:renderer", style, { context: this })).set("filename", data.path).set("sourcemap", config2.sourcemaps).set("compress", config2.compress).set("include css", true).render(callback);
    }
    stylusFn.disableNunjucks = true;
    function rendererStylus2(hexo2) {
      hexo2.extend.renderer.register("styl", "css", stylusFn);
      hexo2.extend.renderer.register("stylus", "css", stylusFn);
    }
    module2.exports = { rendererStylus: rendererStylus2, stylusFn };
  }
});

// src/renderer/rollup/utils/createReadFilterProxy.js
var require_createReadFilterProxy = __commonJS({
  "src/renderer/rollup/utils/createReadFilterProxy.js"(exports2, module2) {
    "use strict";
    var createReadFilterProxy2 = (target, filters = {}) => {
      if (target == null || typeof target !== "object") {
        throw new TypeError();
      }
      let filterKeys = Object.keys(filters).filter((key) => typeof filters[key] === "function");
      if (!filterKeys) {
        return target;
      }
      const filtersMap = filterKeys.reduce((result, key) => {
        result[key] = filters[key];
        return result;
      }, /* @__PURE__ */ Object.create(null));
      filters = null;
      filterKeys = null;
      return new Proxy(target, {
        get(target2, property, receiver) {
          const original = Reflect.get(target2, property, receiver);
          return property in filtersMap ? filtersMap[property](original, target2) : original;
        }
      });
    };
    module2.exports = createReadFilterProxy2;
  }
});

// src/renderer/rollup/utils/rollupPluginFromName.js
var require_rollupPluginFromName = __commonJS({
  "src/renderer/rollup/utils/rollupPluginFromName.js"(exports2, module2) {
    "use strict";
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
    module2.exports = rollupPluginFromName;
  }
});

// src/renderer/rollup/utils/objectWithoutKeys.ts
var objectWithoutKeys_exports = {};
__export(objectWithoutKeys_exports, {
  default: () => objectWithoutKeys_default,
  objectWithoutKeys: () => objectWithoutKeys
});
var objectWithoutKeys, objectWithoutKeys_default;
var init_objectWithoutKeys = __esm({
  "src/renderer/rollup/utils/objectWithoutKeys.ts"() {
    "use strict";
    objectWithoutKeys = (obj, keys) => {
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
    objectWithoutKeys_default = objectWithoutKeys;
  }
});

// src/renderer/rollup/utils/createRollupPlugin.js
var require_createRollupPlugin = __commonJS({
  "src/renderer/rollup/utils/createRollupPlugin.js"(exports2, module2) {
    "use strict";
    var rollupPluginFromName = require_rollupPluginFromName();
    var { objectWithoutKeys: objectWithoutKeys2 } = (init_objectWithoutKeys(), __toCommonJS(objectWithoutKeys_exports));
    var createRollupPlugin2 = (config2) => {
      if (typeof config2 === "string") {
        return rollupPluginFromName(config2)({});
      }
      if (typeof config2 === "object" && "name" in config2) {
        const plugin = rollupPluginFromName(config2.name);
        const options = objectWithoutKeys2(config2, ["name"]);
        return plugin(options);
      }
      throw new TypeError("config most object!");
    };
    module2.exports = createRollupPlugin2;
  }
});

// src/renderer/rollup/utils/getHexoConfigs.js
var require_getHexoConfigs = __commonJS({
  "src/renderer/rollup/utils/getHexoConfigs.js"(exports2, module2) {
    "use strict";
    var mostHexoTypeError = () => {
      throw new TypeError("ctx most Hexo instance!");
    };
    var getRawSiteConfig2 = (name, ctx) => {
      if (!ctx) {
        mostHexoTypeError();
      }
      return ctx.config[name];
    };
    var getRawThemeConfig2 = (name, ctx) => {
      if (!ctx) {
        mostHexoTypeError();
      }
      return ctx.theme.config[name];
    };
    var getRawOverrideThemeConfig2 = (name, ctx) => {
      if (!ctx) {
        mostHexoTypeError();
      }
      if (ctx.config.theme_config == null) {
        return void 0;
      }
      return ctx.config.theme_config[name];
    };
    var getRawConfigs = (name, ctx) => {
      if (!ctx) {
        mostHexoTypeError();
      }
      return {
        site: getRawSiteConfig2(name, ctx),
        theme: getRawThemeConfig2(name, ctx),
        override: getRawOverrideThemeConfig2(name, ctx)
      };
    };
    var getRawAllConfigs = (ctx) => {
      if (!ctx) {
        mostHexoTypeError();
      }
      return {
        site: ctx.config,
        theme: ctx.theme.config,
        override: ctx.config.theme_config
      };
    };
    module2.exports.getRawConfigs = getRawConfigs;
    module2.exports.default = getRawConfigs;
    module2.exports.getRawAllConfigs = getRawAllConfigs;
    module2.exports.getRawSiteConfig = getRawSiteConfig2;
    module2.exports.getRawThemeConfig = getRawThemeConfig2;
    module2.exports.getRawOverrideThemeConfig = getRawOverrideThemeConfig2;
  }
});

// src/renderer/rollup/utils/objectMap.js
var require_objectMap = __commonJS({
  "src/renderer/rollup/utils/objectMap.js"(exports2, module2) {
    "use strict";
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
    module2.exports = objectMap;
  }
});

// src/renderer/rollup/utils/toAbsolutePaths.js
var require_toAbsolutePaths = __commonJS({
  "src/renderer/rollup/utils/toAbsolutePaths.js"(exports2, module2) {
    "use strict";
    var { join: join3, isAbsolute } = require("path");
    var objectMap = require_objectMap();
    var toAbsolutePath2 = (targets, base) => {
      if (targets == null) {
        return [];
      }
      if (typeof targets === "string") {
        if (isAbsolute(targets)) {
          return targets;
        }
        return join3(base, targets);
      }
      return objectMap(targets, (x) => {
        return isAbsolute(x) ? x : join3(base, x);
      });
    };
    module2.exports = toAbsolutePath2;
  }
});

// src/renderer/rollup/HexoRollupConfigs.ts
var HexoRollupConfigs_exports = {};
__export(HexoRollupConfigs_exports, {
  HexoRollupConfigs: () => HexoRollupConfigs
});
var import_createReadFilterProxy, import_createRollupPlugin, import_getHexoConfigs, import_toAbsolutePaths, configFilterProxy, reduceStrings, HexoRollupConfigs;
var init_HexoRollupConfigs = __esm({
  "src/renderer/rollup/HexoRollupConfigs.ts"() {
    "use strict";
    import_createReadFilterProxy = __toESM(require_createReadFilterProxy());
    import_createRollupPlugin = __toESM(require_createRollupPlugin());
    import_getHexoConfigs = __toESM(require_getHexoConfigs());
    import_toAbsolutePaths = __toESM(require_toAbsolutePaths());
    configFilterProxy = (config2, baseDir) => {
      if (config2 == null) {
        return config2;
      }
      return (0, import_createReadFilterProxy.default)(config2, {
        input(original, target) {
          return "input" in target ? (0, import_toAbsolutePaths.default)(original, baseDir) : original;
        },
        plugins(original, target) {
          if (!("plugins" in target)) {
            return original;
          }
          if (Array.isArray(original)) {
            return original.map((plugin) => (0, import_createRollupPlugin.default)(plugin));
          }
          return (0, import_createRollupPlugin.default)(original);
        }
      });
    };
    reduceStrings = (array) => {
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
    HexoRollupConfigs = class {
      constructor(ctx) {
        this.ctx = ctx;
      }
      site() {
        const raw = (0, import_getHexoConfigs.getRawSiteConfig)("rollup", this.ctx);
        return configFilterProxy(raw, this.ctx.base_dir);
      }
      theme() {
        const raw = (0, import_getHexoConfigs.getRawThemeConfig)("rollup", this.ctx);
        return configFilterProxy(raw, this.ctx.theme_dir);
      }
      overrideTheme() {
        const raw = (0, import_getHexoConfigs.getRawOverrideThemeConfig)("rollup", this.ctx);
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
  }
});

// src/renderer/rollup/renderer.js
var require_renderer = __commonJS({
  "src/renderer/rollup/renderer.js"(exports2, module2) {
    "use strict";
    var { rollup } = require("rollup");
    var { HexoRollupConfigs: HexoRollupConfigs2 } = (init_HexoRollupConfigs(), __toCommonJS(HexoRollupConfigs_exports));
    var { objectWithoutKeys: objectWithoutKeys2 } = (init_objectWithoutKeys(), __toCommonJS(objectWithoutKeys_exports));
    var { writefile: writefile3, jsonStringifyWithCircularRefs: jsonStringifyWithCircularRefs3 } = require("sbg-utility");
    var { join: join3 } = require("path");
    var rollupCache = [];
    var rollupRenderAsync = async (config2) => {
      config2.input.cache = rollupCache;
      const bundle = await rollup(config2.input);
      rollupCache = bundle.cache;
      const { code } = await bundle.generate(config2.output);
      return code;
    };
    module2.exports.rollupRenderAsync = rollupRenderAsync;
    async function renderer2(data, _options) {
      const { path: path7, text } = data;
      const hexo2 = this;
      const rollupConfigs = new HexoRollupConfigs2(hexo2);
      const config2 = rollupConfigs.merged();
      if (config2.experimentalCodeSplitting) {
        throw new Error('hexo-renderer-rollup not Support "experimentalCodeSplitting".');
      }
      if (!config2.input.includes(path7)) {
        return text;
      }
      config2.input = path7;
      const input = objectWithoutKeys2(config2, ["output"]);
      const { output } = config2;
      writefile3(join3(hexo2.base_dir, "tmp/config/rollup.json"), jsonStringifyWithCircularRefs3({ input, output, path: path7 }));
      try {
        return await rollupRenderAsync({ input, output });
      } catch (err) {
        this.log.error(err);
        throw err;
      }
    }
    module2.exports = renderer2;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  rendererDartSass: () => rendererDartSass,
  rendererEjs: () => import_renderer_ejs.rendererEjs,
  rendererMarkdownIt: () => rendererMarkdownIt,
  rendererNunjucks: () => import_renderer_nunjucks.rendererNunjucks,
  rendererPug: () => import_renderer_pug.rendererPug,
  rendererRollup: () => rendererRollup,
  rendererSass: () => rendererSass,
  rendererStylus: () => import_renderer_stylus.rendererStylus
});
module.exports = __toCommonJS(src_exports);
var import_sbg_utility4 = require("sbg-utility");
var import_upath2 = __toESM(require("upath"));

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

// src/index.ts
init_helper();
init_collector();
init_util();

// src/renderer-dartsass.ts
var import_sass = __toESM(require("sass"));
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

// src/index.ts
var import_renderer_ejs = __toESM(require_renderer_ejs());

// src/markdown-it/renderer.ts
var import_cheerio = require("cheerio");
var import_markdown_it = __toESM(require("markdown-it"));
var import_sbg_utility3 = require("sbg-utility");
var path4 = __toESM(require("upath"));
var import_anchors = __toESM(require_anchors());
var import_html_tags = __toESM(require_html_tags());
var import_images = __toESM(require_images());
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
    const { preset, render, enable_rules, disable_rules, plugins, anchors, images } = markdown;
    this.parser = new import_markdown_it.default(preset, render);
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
              path4.join(hexo2.base_dir, "node_modules"),
              path4.join(__dirname, "../../"),
              path4.join(__dirname, "../../node_modules")
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
      this.parser.use(import_anchors.default, anchors);
    }
    if (images) {
      this.parser.use(import_images.default, {
        images,
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
      if (!import_html_tags.validHtmlTags.includes(tagName2)) {
        const regex = new RegExp("</?" + tagName2 + ">", "gm");
        regexs.push(regex);
      } else if (tagName2 === "img" || tagName2 === "source" || tagName2 === "iframe") {
        const src = $(element).attr("src");
        if (src && !(0, import_sbg_utility3.isValidHttpUrl)(src) && !src.startsWith(this.hexo.config.root)) {
          const finalSrc = path4.join(this.hexo.config.root, src);
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
  function render(data, options = {}) {
    return renderer2.render(data, options);
  }
  hexo2.extend.renderer.register("md", "html", render, true);
  hexo2.extend.renderer.register("markdown", "html", render, true);
  hexo2.extend.renderer.register("mkd", "html", render, true);
  hexo2.extend.renderer.register("mkdn", "html", render, true);
  hexo2.extend.renderer.register("mdwn", "html", render, true);
  hexo2.extend.renderer.register("mdtxt", "html", render, true);
  hexo2.extend.renderer.register("mdtext", "html", render, true);
  return render;
}

// src/index.ts
var import_renderer_nunjucks = __toESM(require_renderer_nunjucks());
var import_renderer_pug = __toESM(require_renderer_pug());

// src/renderer-sass.ts
var import_node_sass = __toESM(require("node-sass"));
var import_path4 = __toESM(require("path"));
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

// src/index.ts
var import_renderer_stylus = __toESM(require_renderer_stylus());

// src/renderer/rollup/index.ts
var import_renderer2 = __toESM(require_renderer());
function rendererRollup(hexo2) {
  hexo2.extend.renderer.register("js", "js", import_renderer2.default);
  hexo2.extend.renderer.register("mjs", "js", import_renderer2.default);
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
    return (0, import_sbg_utility4.del)(import_upath2.default.join(hexo.base_dir, "tmp/hexo-renderers"));
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
          (0, import_renderer_ejs.rendererEjs)(hexo);
          break;
        case "pug":
          (0, import_renderer_pug.rendererPug)(hexo);
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
          (0, import_renderer_stylus.rendererStylus)(hexo);
          break;
        case "nunjucks":
        case "njk":
          (0, import_renderer_nunjucks.rendererNunjucks)(hexo);
          break;
        case "markdown-it":
          rendererMarkdownIt(hexo);
          break;
      }
    }
  } else {
    hexo.log.info(logname, "activating all engines");
    (0, import_renderer_nunjucks.rendererNunjucks)(hexo);
    (0, import_renderer_ejs.rendererEjs)(hexo);
    (0, import_renderer_pug.rendererPug)(hexo);
    (0, import_renderer_stylus.rendererStylus)(hexo);
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
