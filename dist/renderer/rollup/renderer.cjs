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
    var { objectWithoutKeys: objectWithoutKeys3 } = (init_objectWithoutKeys(), __toCommonJS(objectWithoutKeys_exports));
    var createRollupPlugin2 = (config) => {
      if (typeof config === "string") {
        return rollupPluginFromName(config)({});
      }
      if (typeof config === "object" && "name" in config) {
        const plugin = rollupPluginFromName(config.name);
        const options = objectWithoutKeys3(config, ["name"]);
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
    var { join: join2, isAbsolute } = require("path");
    var objectMap = require_objectMap();
    var toAbsolutePath2 = (targets, base) => {
      if (targets == null) {
        return [];
      }
      if (typeof targets === "string") {
        if (isAbsolute(targets)) {
          return targets;
        }
        return join2(base, targets);
      }
      return objectMap(targets, (x) => {
        return isAbsolute(x) ? x : join2(base, x);
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
    configFilterProxy = (config, baseDir) => {
      if (config == null) {
        return config;
      }
      return (0, import_createReadFilterProxy.default)(config, {
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
  }
});

// src/renderer/rollup/renderer.js
var { rollup } = require("rollup");
var { HexoRollupConfigs: HexoRollupConfigs2 } = (init_HexoRollupConfigs(), __toCommonJS(HexoRollupConfigs_exports));
var { objectWithoutKeys: objectWithoutKeys2 } = (init_objectWithoutKeys(), __toCommonJS(objectWithoutKeys_exports));
var { writefile, jsonStringifyWithCircularRefs } = require("sbg-utility");
var { join } = require("path");
var rollupCache = [];
var rollupRenderAsync = async (config) => {
  config.input.cache = rollupCache;
  const bundle = await rollup(config.input);
  rollupCache = bundle.cache;
  const { code } = await bundle.generate(config.output);
  return code;
};
module.exports.rollupRenderAsync = rollupRenderAsync;
async function renderer(data, _options) {
  const { path, text } = data;
  const hexo = this;
  const rollupConfigs = new HexoRollupConfigs2(hexo);
  const config = rollupConfigs.merged();
  if (config.experimentalCodeSplitting) {
    throw new Error('hexo-renderer-rollup not Support "experimentalCodeSplitting".');
  }
  if (!config.input.includes(path)) {
    return text;
  }
  config.input = path;
  const input = objectWithoutKeys2(config, ["output"]);
  const { output } = config;
  writefile(join(hexo.base_dir, "tmp/config/rollup.json"), jsonStringifyWithCircularRefs({ input, output, path }));
  try {
    return await rollupRenderAsync({ input, output });
  } catch (err) {
    this.log.error(err);
    throw err;
  }
}
module.exports = renderer;
