import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __commonJS
} from "./chunk-QAIXVEL3.mjs";

// src/renderer/rollup/utils/getHexoConfigs.js
var require_getHexoConfigs = __commonJS({
  "src/renderer/rollup/utils/getHexoConfigs.js"(exports, module) {
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
    var getRawConfigs = (name, ctx) => {
      if (!ctx) {
        mostHexoTypeError();
      }
      return {
        site: getRawSiteConfig(name, ctx),
        theme: getRawThemeConfig(name, ctx),
        override: getRawOverrideThemeConfig(name, ctx)
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
    module.exports.getRawConfigs = getRawConfigs;
    module.exports.default = getRawConfigs;
    module.exports.getRawAllConfigs = getRawAllConfigs;
    module.exports.getRawSiteConfig = getRawSiteConfig;
    module.exports.getRawThemeConfig = getRawThemeConfig;
    module.exports.getRawOverrideThemeConfig = getRawOverrideThemeConfig;
  }
});

export {
  require_getHexoConfigs
};
