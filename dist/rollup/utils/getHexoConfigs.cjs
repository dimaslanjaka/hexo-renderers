'use strict';

const mostHexoTypeError = () => {
    throw new TypeError('ctx must be a Hexo instance!');
};
function getRawSiteConfig(name, ctx) {
    if (!ctx) {
        mostHexoTypeError();
    }
    return ctx.config[name];
}
function getRawThemeConfig(name, ctx) {
    if (!ctx) {
        mostHexoTypeError();
    }
    return ctx.theme.config[name];
}
function getRawOverrideThemeConfig(name, ctx) {
    if (!ctx) {
        mostHexoTypeError();
    }
    if (ctx.config.theme_config == null) {
        return undefined;
    }
    return ctx.config.theme_config[name];
}

exports.getRawOverrideThemeConfig = getRawOverrideThemeConfig;
exports.getRawSiteConfig = getRawSiteConfig;
exports.getRawThemeConfig = getRawThemeConfig;
