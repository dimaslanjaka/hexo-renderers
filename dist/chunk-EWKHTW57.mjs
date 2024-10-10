import { createRequire } from 'module'; const require = createRequire(import.meta.url);

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

export {
  getRawSiteConfig,
  getRawThemeConfig,
  getRawOverrideThemeConfig,
  getRawConfigs,
  getRawAllConfigs
};
