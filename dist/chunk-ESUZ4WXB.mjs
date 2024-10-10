import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  init_partial,
  partialWithLayout
} from "./chunk-DWRQMMIC.mjs";
import {
  getRelatedPosts,
  init_related_posts
} from "./chunk-TONA6L3N.mjs";
import {
  date,
  date_xml,
  full_date,
  init_date,
  moment,
  relative_date,
  time,
  time_tag
} from "./chunk-AY5VDOOF.mjs";
import {
  getAuthor,
  init_getAuthor
} from "./chunk-77JXBHLC.mjs";
import {
  getPostByLabel,
  init_getPostByLabel
} from "./chunk-S42X4VKR.mjs";
import {
  __esm,
  __export
} from "./chunk-QAIXVEL3.mjs";

// src/helper/index.ts
var helper_exports = {};
__export(helper_exports, {
  BASE_DIR: () => BASE_DIR,
  registerCustomHelper: () => registerCustomHelper
});
import fs from "fs";
import * as hexoUtil from "hexo-util";
import lodash from "lodash";
import path from "path";
import yaml from "yaml";
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
var _toArray, BASE_DIR, configFile, config, THEME_LOCATION, _THEME_SCRIPTS;
var init_helper = __esm({
  "src/helper/index.ts"() {
    init_date();
    init_getAuthor();
    init_getPostByLabel();
    init_partial();
    init_related_posts();
    _toArray = lodash.toArray;
    BASE_DIR = typeof hexo === "undefined" ? process.cwd() : hexo.base_dir;
    configFile = path.join(BASE_DIR, "_config.yml");
    config = {};
    if (fs.existsSync(configFile)) {
      if (typeof hexo === "undefined") {
        config = yaml.parse(fs.readFileSync(configFile).toString());
      } else {
        config = hexo.config;
      }
    }
    THEME_LOCATION = path.join(process.cwd(), "themes", config.theme || "landscape");
    _THEME_SCRIPTS = path.join(THEME_LOCATION, "scripts");
  }
});

export {
  BASE_DIR,
  registerCustomHelper,
  helper_exports,
  init_helper
};
