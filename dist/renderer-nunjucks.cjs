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

// src/renderer-nunjucks.ts
var renderer_nunjucks_exports = {};
__export(renderer_nunjucks_exports, {
  default: () => renderer_nunjucks_default,
  rendererNunjucks: () => rendererNunjucks
});
module.exports = __toCommonJS(renderer_nunjucks_exports);
var import_fs_extra3 = __toESM(require("fs-extra"), 1);
var import_nunjucks = __toESM(require("nunjucks"), 1);
var import_upath = __toESM(require("upath"), 1);

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
function toMomentLocales(lang) {
  if (lang === void 0) {
    return void 0;
  }
  if (!lang || lang === "en" || lang === "default") {
    return "en";
  }
  return lang.toLowerCase().replace("_", "-");
}
var toMomentLocale = import_moize.default.shallow(toMomentLocales);

// src/helper/partial.ts
var path = __toESM(require("upath"), 1);

// src/helper/related-posts.ts
var import_fs_extra2 = __toESM(require("fs-extra"), 1);
var import_lodash = __toESM(require("lodash"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_sbg_utility2 = require("sbg-utility");

// src/helper/collector.ts
var cheerio = __toESM(require("cheerio"), 1);
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_path = __toESM(require("path"), 1);
var import_sbg_utility = require("sbg-utility");

// src/helper/util.ts
var import_ansi_colors = __toESM(require("ansi-colors"), 1);
var logname = import_ansi_colors.default.magentaBright("hexo-renderers");

// src/helper/related-posts.ts
var assign = import_lodash.default.assign;

// src/helper/index.ts
var import_meta = {};
var require2 = (0, import_module.createRequire)(import_meta.url);
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

// src/renderer-nunjucks.ts
var import_sbg_utility3 = require("sbg-utility");
var base_dir = typeof hexo !== "undefined" && hexo.base_dir ? hexo.base_dir : process.cwd();
var tmpdir = import_upath.default.join(base_dir, "tmp", "hexo-renderers");
var logfile = import_upath.default.join(tmpdir, "nunjucks-log.json");
function rendererNunjucks(hexo2) {
  const themeDir = import_upath.default.join(hexo2.base_dir, "themes", hexo2.config.theme);
  const env = import_nunjucks.default.configure([themeDir, import_upath.default.join(themeDir, "layout")], {
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
  function render(data, locals) {
    if ("text" in data) {
      return import_nunjucks.default.renderString(data.text, locals);
    }
    logs.render.push(data.path);
    (0, import_sbg_utility3.writefile)(logfile, JSON.stringify(logs, null, 2));
    return import_nunjucks.default.render(data.path, locals);
  }
  function compile(data) {
    logs.compile.push(data.path);
    (0, import_sbg_utility3.writefile)(logfile, JSON.stringify(logs, null, 2));
    const compiled = import_nunjucks.default.compile(
      "text" in data ? data.text : import_fs_extra3.default.readFileSync(data.path, "utf-8"),
      env
    );
    return compiled.render.bind(compiled);
  }
  render.compile = compile;
  hexo2.extend.renderer.register("njk", "html", render, false);
  hexo2.extend.renderer.register("j2", "html", render, false);
  return { render, rendererNunjucks, compile };
}
var renderer_nunjucks_default = rendererNunjucks;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rendererNunjucks
});
