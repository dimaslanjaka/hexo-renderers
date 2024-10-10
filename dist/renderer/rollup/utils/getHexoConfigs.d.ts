/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
export function getRawConfigs(name: string | symbol, ctx: Hexo): {
    site: any;
    theme: any;
    override: any;
};
/**
 * @param {Hexo} ctx
 */
export function getRawAllConfigs(ctx: Hexo): {
    site: any;
    theme: any;
    override: any;
};
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
export function getRawOverrideThemeConfig(name: string | symbol, ctx: Hexo): any;
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
export function getRawSiteConfig(name: string | symbol, ctx: Hexo): any;
/**
 * @param {string|symbol} name
 * @param {Hexo} ctx
 */
export function getRawThemeConfig(name: string | symbol, ctx: Hexo): any;
export { getRawConfigs as default };
