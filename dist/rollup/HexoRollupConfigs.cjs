'use strict';

var createReadFilterProxy = require('./utils/createReadFilterProxy.cjs');
var createRollupPlugin = require('./utils/createRollupPlugin.cjs');
var getHexoConfigs = require('./utils/getHexoConfigs.cjs');
var toAbsolutePaths = require('./utils/toAbsolutePaths.cjs');

/**
 * @param config
 * @param baseDir
 */
const configFilterProxy = (config, baseDir) => {
    if (config == null) {
        return config;
    }
    return createReadFilterProxy(config, {
        input(original, target) {
            return 'input' in target ? toAbsolutePaths(original, baseDir) : original;
        },
        plugins(original, target) {
            if (!('plugins' in target)) {
                return original;
            }
            if (Array.isArray(original)) {
                return original.map((plugin) => createRollupPlugin(plugin));
            }
            return createRollupPlugin(original);
        }
    });
};
/**
 * @param array
 * @returns
 */
const reduceStrings = (array) => {
    const initial = [];
    return array.reduce((array, item) => {
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
class HexoRollupConfigs {
    constructor(ctx) {
        this.ctx = ctx;
    }
    site() {
        const raw = getHexoConfigs.getRawSiteConfig('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.base_dir);
    }
    theme() {
        const raw = getHexoConfigs.getRawThemeConfig('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.theme_dir);
    }
    overrideTheme() {
        const raw = getHexoConfigs.getRawOverrideThemeConfig('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.base_dir);
    }
    merged() {
        const site = this.site();
        const theme = this.theme();
        const override = this.overrideTheme();
        const hexo = this.ctx;
        const _default = {
            output: {
                format: 'esm',
                file: 'tmp/dist/bundle.js'
            },
            onwarn(warning) {
                hexo.log.warn(warning);
            }
            // onLog(_level, log, _handler) {
            //   hexo.log.log(log.message);
            // }
        };
        const input = reduceStrings([site, theme, override].filter((config) => config != null && 'input' in config).map((config) => config.input));
        return Object.assign(_default, site, theme, override, { input });
    }
}

exports.HexoRollupConfigs = HexoRollupConfigs;
