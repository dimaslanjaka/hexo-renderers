"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/renderer/rollup/utils/getHexoConfigs.js
var getHexoConfigs_exports = {};
__export(getHexoConfigs_exports, {
  default: () => getRawConfigs,
  getRawAllConfigs: () => getRawAllConfigs,
  getRawConfigs: () => getRawConfigs,
  getRawOverrideThemeConfig: () => getRawOverrideThemeConfig,
  getRawSiteConfig: () => getRawSiteConfig,
  getRawThemeConfig: () => getRawThemeConfig
});
module.exports = __toCommonJS(getHexoConfigs_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRawAllConfigs,
  getRawConfigs,
  getRawOverrideThemeConfig,
  getRawSiteConfig,
  getRawThemeConfig
});
