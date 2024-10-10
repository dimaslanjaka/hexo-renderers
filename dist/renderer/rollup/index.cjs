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

// src/renderer/rollup/index.ts
var rollup_exports = {};
__export(rollup_exports, {
  rendererRollup: () => rendererRollup
});
module.exports = __toCommonJS(rollup_exports);

// src/renderer/rollup/renderer.js
var import_path = require("path");
var import_rollup = require("rollup");
var import_sbg_utility = require("sbg-utility");

// src/renderer/rollup/utils/createReadFilterProxy.js
var createReadFilterProxy = (target, filters = {}) => {
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
var import_module = require("module");
var import_meta = {};
var require2 = (0, import_module.createRequire)(import_meta.url);
var rollupPluginFromName = (name) => {
  if (typeof name !== "string") {
    throw new TypeError("name most string");
  }
  const pluginPrefix = "rollup-plugin-";
  if (!name.startsWith(pluginPrefix)) {
    name = pluginPrefix + name;
  }
  return require2(name);
};
var rollupPluginFromName_default = rollupPluginFromName;

// src/renderer/rollup/utils/createRollupPlugin.js
var createRollupPlugin = (config) => {
  if (typeof config === "string") {
    return rollupPluginFromName_default(config)({});
  }
  if (typeof config === "object" && "name" in config) {
    const plugin = rollupPluginFromName_default(config.name);
    const options = objectWithoutKeys(config, ["name"]);
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
var path = __toESM(require("path"), 1);

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
    if (path.isAbsolute(targets)) {
      return targets;
    }
    return path.join(base, targets);
  }
  return objectMap_default(targets, (x) => {
    return path.isAbsolute(x) ? x : path.join(base, x);
  });
};
var toAbsolutePaths_default = toAbsolutePath;

// src/renderer/rollup/HexoRollupConfigs.ts
var configFilterProxy = (config, baseDir) => {
  if (config == null) {
    return config;
  }
  return createReadFilterProxy_default(config, {
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
    const hexo = this.ctx;
    const _default = {
      output: {
        format: "esm"
      },
      onwarn(warning) {
        hexo.log.warn(warning);
      }
    };
    const input = reduceStrings(
      [site, theme, override].filter((config) => config != null && "input" in config).map((config) => config.input)
    );
    return Object.assign(_default, site, theme, override, { input });
  }
};

// src/renderer/rollup/renderer.js
var rollupCache = [];
var rollupRenderAsync = async (config) => {
  config.input.cache = rollupCache;
  const bundle = await (0, import_rollup.rollup)(config.input);
  rollupCache = bundle.cache;
  const { code } = await bundle.generate(config.output);
  return code;
};
async function renderer(data, _options) {
  const { path: path2, text } = data;
  const hexo = this;
  const rollupConfigs = new HexoRollupConfigs(hexo);
  const config = rollupConfigs.merged();
  if (config.experimentalCodeSplitting) {
    throw new Error('hexo-renderer-rollup not Support "experimentalCodeSplitting".');
  }
  if (!config.input.includes(path2)) {
    return text;
  }
  config.input = path2;
  const input = objectWithoutKeys(config, ["output"]);
  const { output } = config;
  (0, import_sbg_utility.writefile)((0, import_path.join)(hexo.base_dir, "tmp/config/rollup.json"), (0, import_sbg_utility.jsonStringifyWithCircularRefs)({ input, output, path: path2 }));
  try {
    return await rollupRenderAsync({ input, output });
  } catch (err) {
    this.log.error(err);
    throw err;
  }
}
var renderer_default = renderer;

// src/renderer/rollup/index.ts
function rendererRollup(hexo) {
  hexo.extend.renderer.register("js", "js", renderer_default);
  hexo.extend.renderer.register("mjs", "js", renderer_default);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rendererRollup
});
