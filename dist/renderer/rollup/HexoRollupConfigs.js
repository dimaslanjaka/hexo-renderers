'use strict';
import createReadFilterProxy from './utils/createReadFilterProxy.js';
import createRollupPlugin from './utils/createRollupPlugin.js';
import { getRawOverrideThemeConfig, getRawSiteConfig, getRawThemeConfig } from './utils/getHexoConfigs.js';
import toAbsolutePath from './utils/toAbsolutePaths.js';
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
            return 'input' in target ? toAbsolutePath(original, baseDir) : original;
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
export class HexoRollupConfigs {
    constructor(ctx) {
        this.ctx = ctx;
    }
    site() {
        const raw = getRawSiteConfig('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.base_dir);
    }
    theme() {
        const raw = getRawThemeConfig('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.theme_dir);
    }
    overrideTheme() {
        const raw = getRawOverrideThemeConfig('rollup', this.ctx);
        return configFilterProxy(raw, this.ctx.base_dir);
    }
    merged() {
        const site = this.site();
        const theme = this.theme();
        const override = this.overrideTheme();
        const hexo = this.ctx;
        const _default = {
            output: {
                format: 'esm'
            },
            onwarn(warning) {
                hexo.log.warn(warning);
            }
        };
        const input = reduceStrings([site, theme, override].filter((config) => config != null && 'input' in config).map((config) => config.input));
        return Object.assign(_default, site, theme, override, { input });
    }
}
