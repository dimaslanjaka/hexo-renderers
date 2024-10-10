import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  toAbsolutePaths_default
} from "./chunk-NDKO3BRP.mjs";
import {
  createReadFilterProxy_default
} from "./chunk-H5COYFD7.mjs";
import {
  createRollupPlugin_default
} from "./chunk-CZPJNQBL.mjs";
import {
  getRawOverrideThemeConfig,
  getRawSiteConfig,
  getRawThemeConfig
} from "./chunk-EWKHTW57.mjs";

// src/renderer/rollup/HexoRollupConfigs.ts
var configFilterProxy = (config, baseDir) => {
  if (config == null) {
    return config;
  }
  return createReadFilterProxy_default(config, {
    input(original, target) {
      return "input" in target ? toAbsolutePaths_default(original, baseDir) : original;
    },
    plugins(original, target) {
      if (!("plugins" in target)) {
        return original;
      }
      if (Array.isArray(original)) {
        return original.map((plugin) => createRollupPlugin_default(plugin));
      }
      return createRollupPlugin_default(original);
    }
  });
};
var reduceStrings = (array) => {
  const initial = [];
  return array.reduce((array2, item) => {
    if (typeof item === "string") {
      array2.push(item);
    } else if (Array.isArray(item)) {
      array2 = array2.concat(item);
    } else if (typeof item === "object") {
      array2 = array2.concat(Array.from(Object.values(item)));
    }
    return array2;
  }, initial);
};
var HexoRollupConfigs = class {
  constructor(ctx) {
    this.ctx = ctx;
  }
  site() {
    const raw = getRawSiteConfig("rollup", this.ctx);
    return configFilterProxy(raw, this.ctx.base_dir);
  }
  theme() {
    const raw = getRawThemeConfig("rollup", this.ctx);
    return configFilterProxy(raw, this.ctx.theme_dir);
  }
  overrideTheme() {
    const raw = getRawOverrideThemeConfig("rollup", this.ctx);
    return configFilterProxy(raw, this.ctx.base_dir);
  }
  merged() {
    const site = this.site();
    const theme = this.theme();
    const override = this.overrideTheme();
    const hexo = this.ctx;
    const _default = {
      output: {
        format: "esm"
      },
      onwarn(warning) {
        hexo.log.warn(warning);
      }
    };
    const input = reduceStrings(
      [site, theme, override].filter((config) => config != null && "input" in config).map((config) => config.input)
    );
    return Object.assign(_default, site, theme, override, { input });
  }
};

export {
  HexoRollupConfigs
};
