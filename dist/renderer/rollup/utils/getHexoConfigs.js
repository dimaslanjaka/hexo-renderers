'use strict';
var mostHexoTypeError = function () {
    throw new TypeError('ctx most Hexo instance!');
};
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
var getRawSiteConfig = function (name, ctx) {
    if (!ctx) {
        mostHexoTypeError();
    }
    return ctx.config[name];
};
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
var getRawThemeConfig = function (name, ctx) {
    if (!ctx) {
        mostHexoTypeError();
    }
    return ctx.theme.config[name];
};
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
var getRawOverrideThemeConfig = function (name, ctx) {
    if (!ctx) {
        mostHexoTypeError();
    }
    if (ctx.config.theme_config == null) {
        return undefined;
    }
    return ctx.config.theme_config[name];
};
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
var getRawConfigs = function (name, ctx) {
    if (!ctx) {
        mostHexoTypeError();
    }
    return {
        site: getRawSiteConfig(name, ctx),
        theme: getRawThemeConfig(name, ctx),
        override: getRawOverrideThemeConfig(name, ctx)
    };
};
/**
 * @param {Hexo} ctx
 */
var getRawAllConfigs = function (ctx) {
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
