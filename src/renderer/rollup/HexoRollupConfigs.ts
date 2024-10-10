'use strict';

import Hexo from 'hexo';

import { RollupOptions } from 'rollup';
import createReadFilterProxy from './utils/createReadFilterProxy.js';
import createRollupPlugin from './utils/createRollupPlugin.js';
import { getRawOverrideThemeConfig, getRawSiteConfig, getRawThemeConfig } from './utils/getHexoConfigs.js';
import toAbsolutePath from './utils/toAbsolutePaths.js';

/**
 * @param config
 * @param baseDir
 */
const configFilterProxy = <T>(config: T, baseDir: string) => {
  if (config == null) {
    return config;
  }
  return createReadFilterProxy(config, {
    input(original: any, target: any) {
      return 'input' in target ? toAbsolutePath(original, baseDir) : original;
    },
    plugins(original: any[], target: any) {
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
const reduceStrings = (array: Array<string | string[] | Record<string, string>>): string[] => {
  const initial: any[] = [];

  return array.reduce((array, item) => {
    if (typeof item === 'string') {
      array.push(item);
    } else if (Array.isArray(item)) {
      array = array.concat(item);
    } else if (typeof item === 'object') {
      array = array.concat(Array.from(Object.values(item)));
    }
    return array;
  }, initial);
};

export class HexoRollupConfigs {
  ctx: Hexo;

  constructor(ctx: Hexo) {
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
  merged(): RollupOptions {
    const site = this.site();
    const theme = this.theme();
    const override = this.overrideTheme();
    const hexo = this.ctx;

    const _default: RollupOptions = {
      output: {
        format: 'esm'
      },
      onwarn(warning: any) {
        hexo.log.warn(warning);
      }
    };

    const input = reduceStrings(
      [site, theme, override].filter((config) => config != null && 'input' in config).map((config) => config.input)
    );

    return Object.assign(_default, site, theme, override, { input });
  }
}
