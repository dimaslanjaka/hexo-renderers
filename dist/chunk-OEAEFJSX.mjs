import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  partialWithLayout
} from "./chunk-CUX5OQM4.mjs";
import {
  getRelatedPosts
} from "./chunk-NXNWXIDH.mjs";
import {
  date,
  date_xml,
  full_date,
  moment,
  relative_date,
  time,
  time_tag
} from "./chunk-AGVFLRMZ.mjs";
import {
  getAuthor
} from "./chunk-RBWQV3YM.mjs";
import {
  getPostByLabel
} from "./chunk-6GCRMZR3.mjs";
import {
  __require
} from "./chunk-LPG7NA4D.mjs";

// src/helper/index.ts
import fs from "fs";
import * as hexoUtil from "hexo-util";
import lodash from "lodash";
import { createRequire } from "module";
import path from "path";
import yaml from "yaml";
if (typeof __require === "undefined") global.require = createRequire(import.meta.url);
var _toArray = lodash.toArray;
var BASE_DIR = typeof hexo === "undefined" ? process.cwd() : hexo.base_dir;
var configFile = path.join(BASE_DIR, "_config.yml");
var config = {};
if (fs.existsSync(configFile)) {
  if (typeof hexo === "undefined") {
    config = yaml.parse(fs.readFileSync(configFile, "utf-8"));
  } else {
    config = hexo.config;
  }
}
var THEME_LOCATION = path.join(process.cwd(), "themes", config.theme || "landscape");
var _THEME_SCRIPTS = path.join(THEME_LOCATION, "scripts");
function loadScripts(base) {
  if (fs.existsSync(base)) {
    fs.readdirSync(base).forEach((p) => {
      const full = path.join(base, p);
      if (fs.statSync(full).isFile()) {
        __require(full);
      } else if (fs.statSync(full).isDirectory()) {
        loadScripts(full);
      }
    });
  }
}
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
  hexo2.extend.helper.register("moment", moment);
  hexo2.extend.helper.register("url_for", hexoUtil.url_for);
  for (const key in hexoUtil) {
    if (Object.prototype.hasOwnProperty.call(hexoUtil, key)) {
      const helper = hexoUtil[key];
      hexo2.extend.helper.register(key, helper);
    }
  }
}

export {
  BASE_DIR,
  loadScripts,
  isObject,
  toArray,
  registerCustomHelper
};
