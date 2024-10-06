'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexoRollupConfigs = void 0;
var createReadFilterProxy_1 = __importDefault(require("./utils/createReadFilterProxy"));
var createRollupPlugin_1 = __importDefault(require("./utils/createRollupPlugin"));
var getHexoConfigs_1 = require("./utils/getHexoConfigs");
var toAbsolutePaths_1 = __importDefault(require("./utils/toAbsolutePaths"));
/** @typedef {NodeJS.EventEmitter} Hexo */
/**
 * @param config
 * @param baseDir
 */
var configFilterProxy = function (config, baseDir) {
    if (config == null) {
        return config;
    }
    return (0, createReadFilterProxy_1.default)(config, {
        input: function (original, target) {
            return 'input' in target ? (0, toAbsolutePaths_1.default)(original, baseDir) : original;
        },
        plugins: function (original, target) {
            if (!('plugins' in target)) {
                return original;
            }
            if (Array.isArray(original)) {
                return original.map(function (plugin) { return (0, createRollupPlugin_1.default)(plugin); });
            }
            return (0, createRollupPlugin_1.default)(original);
        }
    });
};
/**
 * @param array
 * @returns
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
        var raw = (0, getHexoConfigs_1.getRawSiteConfig)('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.base_dir);
    };
    HexoRollupConfigs.prototype.theme = function () {
        var raw = (0, getHexoConfigs_1.getRawThemeConfig)('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.theme_dir);
    };
    HexoRollupConfigs.prototype.overrideTheme = function () {
        var raw = (0, getHexoConfigs_1.getRawOverrideThemeConfig)('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.base_dir);
    };
    HexoRollupConfigs.prototype.merged = function () {
        var site = this.site();
        var theme = this.theme();
        var override = this.overrideTheme();
        var hexo = this.ctx;
        var _default = {
            output: {
                format: 'esm'
            },
            onwarn: function (warning) {
                hexo.log.warn(warning);
            }
        };
        var input = reduceStrings([site, theme, override].filter(function (config) { return config != null && 'input' in config; }).map(function (config) { return config.input; }));
        return Object.assign(_default, site, theme, override, { input: input });
    };
    return HexoRollupConfigs;
}());
exports.HexoRollupConfigs = HexoRollupConfigs;
