'use strict';

/**
 * get hexo renderers config (_config_yml.renderers)
 * @param hexo
 * @returns
 */
function getRendererConfig(hexo) {
    var _a;
    const defaultOptions = {
        generator: ['meta'],
        engines: [],
        html_tags: [],
        fix: {
            html: false,
            cache: false
        }
    };
    const options = Object.assign(defaultOptions, ((_a = hexo.config.renderers) === null || _a === void 0 ? void 0 : _a.generator) || {}, hexo.config.renderers || {});
    // shim v1 options
    if (Array.isArray(hexo.config.renderers)) {
        options.engines = hexo.config.renderers;
    }
    return options;
}

module.exports = getRendererConfig;
