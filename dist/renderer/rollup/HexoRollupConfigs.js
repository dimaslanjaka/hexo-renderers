'use strict';
var toAbsolutePath = require('./utils/toAbsolutePaths');
var createRollupPlugin = require('./utils/createRollupPlugin');
var createReadFilterProxy = require('./utils/createReadFilterProxy');
var _a = require('./utils/getHexoConfigs'), getRawSiteConfig = _a.getRawSiteConfig, getRawThemeConfig = _a.getRawThemeConfig, getRawOverrideThemeConfig = _a.getRawOverrideThemeConfig;
/** @typedef {NodeJS.EventEmitter} Hexo */
/**
 * @template T
 * @param {T} config
 * @param {string} baseDir
 */
var configFilterProxy = function (config, baseDir) {
    if (config == null) {
        return config;
    }
    return createReadFilterProxy(config, {
        input: function (original, target) {
            return 'input' in target ? toAbsolutePath(original, baseDir) : original;
        },
        plugins: function (original, target) {
            if (!('plugins' in target)) {
                return original;
            }
            if (Array.isArray(original)) {
                return original.map(function (plugin) { return createRollupPlugin(plugin); });
            }
            return createRollupPlugin(original);
        }
    });
};
/**
 * @param {Array<string|string[]|Record<string, string>>} array
 * @returns {string[]}
 */
var reduceStrings = function (array) {
    var initial = [];
    return array.reduce(function (array, item) {
        if (typeof item === 'string') {
            array.push(item);
        }
        else if (Array.isArray(item)) {
            array = array.concat(item);
        }
        else if (typeof item === 'object') {
            array = array.concat(Array.from(Object.values(item)));
        }
        return array;
    }, initial);
};
var HexoRollupConfigs = /** @class */ (function () {
    function HexoRollupConfigs(ctx) {
        this.ctx = ctx;
    }
    HexoRollupConfigs.prototype.site = function () {
        var raw = getRawSiteConfig('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.base_dir);
    };
    HexoRollupConfigs.prototype.theme = function () {
        var raw = getRawThemeConfig('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.theme_dir);
    };
    HexoRollupConfigs.prototype.overrideTheme = function () {
        var raw = getRawOverrideThemeConfig('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.base_dir);
    };
    HexoRollupConfigs.prototype.merged = function () {
        var site = this.site();
        var theme = this.theme();
        var override = this.overrideTheme();
        var _default = {
            output: {
                format: 'esm'
            },
            onwarn: function (warning) {
                this.ctx.log.warning(warning);
            }
        };
        var input = reduceStrings([site, theme, override].filter(function (config) { return config != null && 'input' in config; }).map(function (config) { return config.input; }));
        return Object.assign(_default, site, theme, override, { input: input });
    };
    return HexoRollupConfigs;
}());
module.exports = HexoRollupConfigs;
