'use strict';

import Hexo from 'hexo';

const mostHexoTypeError = (): never => {
  throw new TypeError('ctx must be a Hexo instance!');
};

function getRawSiteConfig(name: string | symbol, ctx: Hexo): any {
  if (!ctx) {
    mostHexoTypeError();
  }
  return (ctx.config as any)[name];
}

function getRawThemeConfig(name: string | symbol, ctx: Hexo): any {
  if (!ctx) {
    mostHexoTypeError();
  }
  return (ctx.theme.config as any)[name];
}

function getRawOverrideThemeConfig(name: string | symbol, ctx: Hexo): any | undefined {
  if (!ctx) {
    mostHexoTypeError();
  }
  if (ctx.config.theme_config == null) {
    return undefined;
  }
  return ctx.config.theme_config[name];
}

function getRawConfigs(name: string | symbol, ctx: Hexo): { site: any; theme: any; override: any | undefined } {
  if (!ctx) {
    mostHexoTypeError();
  }
  return {
    site: getRawSiteConfig(name, ctx),
    theme: getRawThemeConfig(name, ctx),
    override: getRawOverrideThemeConfig(name, ctx)
  };
}

function getRawAllConfigs(ctx: Hexo): {
  site: Record<string, any>;
  theme: Record<string, any>;
  override: any | undefined;
} {
  if (!ctx) {
    mostHexoTypeError();
  }
  return {
    site: ctx.config,
    theme: ctx.theme.config,
    override: ctx.config.theme_config
  };
}

// Exporting all functions at once
export {
  getRawConfigs as default,
  getRawAllConfigs,
  getRawConfigs,
  getRawOverrideThemeConfig,
  getRawSiteConfig,
  getRawThemeConfig
};
