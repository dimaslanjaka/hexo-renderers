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
    const path5 = (0, import_upath.join)((0, import_upath.dirname)(currentView), name);
    const view = ctx.theme.getView(path5) || ctx.theme.getView(name);
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
var import_ansi_colors, tagName, logname;
var init_util = __esm({
  "src/helper/util.ts"() {
    "use strict";
    import_ansi_colors = __toESM(require("ansi-colors"));
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
  var _a;
  const options = (_a = hexo2.config.renderers) == null ? void 0 : _a.generator;
  if (Array.isArray(options)) {
    if (!options.includes("related-posts")) return;
  } else {
    return;
  }
  hexo2.extend.helper.register(
    "list_related_posts",
    function(options2) {
      var _a2, _b;
      const relatedDb = import_path2.default.join(
        hexo2.base_dir,
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

// src/renderer-nunjucks.js
var nunjucks = require("nunjucks");
var fs4 = require("fs-extra");
var path4 = require("upath");
var { toArray: toArray2 } = (init_helper(), __toCommonJS(helper_exports));
var { writefile: writefile3 } = require("sbg-utility");
var tmpdir = path4.join(__dirname, "../tmp");
var logfile = path4.join(tmpdir, "nunjucks-log.json");
function rendererNunjucks(hexo2) {
  const themeDir = path4.join(hexo2.base_dir, "themes", hexo2.config.theme);
  const env = nunjucks.configure([themeDir, path4.join(themeDir, "layout")], {
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
  return { render, rendererNunjucks, compile };
}
module.exports = { rendererNunjucks };
