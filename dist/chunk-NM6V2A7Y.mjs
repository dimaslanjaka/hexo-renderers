import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  require_toAbsolutePaths
} from "./chunk-SVMFIJ4L.mjs";
import {
  require_createReadFilterProxy
} from "./chunk-JZEFAEOM.mjs";
import {
  require_createRollupPlugin
} from "./chunk-SHR7XKHU.mjs";
import {
  require_getHexoConfigs
} from "./chunk-PPMINO4V.mjs";
import {
  __esm,
  __export,
  __toESM
} from "./chunk-QAIXVEL3.mjs";

// src/renderer/rollup/HexoRollupConfigs.ts
var HexoRollupConfigs_exports = {};
__export(HexoRollupConfigs_exports, {
  HexoRollupConfigs: () => HexoRollupConfigs
});
var import_createReadFilterProxy, import_createRollupPlugin, import_getHexoConfigs, import_toAbsolutePaths, configFilterProxy, reduceStrings, HexoRollupConfigs;
var init_HexoRollupConfigs = __esm({
  "src/renderer/rollup/HexoRollupConfigs.ts"() {
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

export {
  HexoRollupConfigs,
  HexoRollupConfigs_exports,
  init_HexoRollupConfigs
};
