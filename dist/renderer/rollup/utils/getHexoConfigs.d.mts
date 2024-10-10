/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
declare function getRawConfigs(name: string | symbol, ctx: Hexo): {
    site: any;
    theme: any;
    override: any;
};
/**
 * @param {Hexo} ctx
 */
declare function getRawAllConfigs(ctx: Hexo): {
    site: any;
    theme: any;
    override: any;
};
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
declare function getRawSiteConfig(name: string | symbol, ctx: Hexo): any;
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
declare function getRawThemeConfig(name: string | symbol, ctx: Hexo): any;
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
declare function getRawOverrideThemeConfig(name: string | symbol, ctx: Hexo): any;

export { getRawConfigs as default, getRawAllConfigs, getRawConfigs, getRawOverrideThemeConfig, getRawSiteConfig, getRawThemeConfig };
