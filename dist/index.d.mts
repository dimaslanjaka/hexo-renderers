import * as Hexo from 'hexo';
import Hexo__default from 'hexo';
import * as moize from 'moize';
import moment from 'moment-timezone';
export { default as moment } from 'moment-timezone';
import * as marked from 'marked';
import { MarkedOptions } from 'marked';
import nunjucks from 'nunjucks';
import { PageSchema } from 'hexo/dist/types';
import * as pug from 'pug';
import * as rollup from 'rollup';
import { RollupOptions } from 'rollup';

declare function initCli(hexo: Hexo__default): void;

interface HexoLocalsData {
    [key: string]: any;
    page: {
        [key: string]: any;
        path: string;
    };
    path: string;
    url: string;
    config: Hexo__default['config'];
    theme: Record<string, any>;
    layout: string;
    env: any;
    view_dir: string;
    site: Record<string, any>;
    cache?: boolean;
    /** absolute path source post markdown */
    full_source?: string;
    tags?: any;
    categories?: any;
}
interface HexoRenderData {
    text?: string;
    path?: string;
}

declare const escapeHtml: (str: string) => string;
/**
 * Fix generated html
 * @param html
 * @returns
 */
declare function htmlFixer(this: Hexo__default, html: string, data: Partial<HexoLocalsData>): string;

declare function registerCustomGenerator(hexo: Hexo, generators: string[]): void;

/**
 * create `meta.json` can be accessed at `http://example.com/meta.json`
 * @param hexo
 */
declare function metaJsonCreator(hexo: Hexo): void;

/**
 * get post database path
 * @param hexo
 * @returns
 */
declare function postDataFilePath(hexo: Hexo__default): string;
/**
 * load existing database (initial only)
 */
declare function loadPostData(hexo: Hexo__default): void;
/**
 * get loaded post data (getter)
 * @returns
 */
declare const getPostData: () => HexoLocalsData[];
declare function collectorPost(post: HexoLocalsData, hexo: Hexo__default): void;

declare function toISOString(date: moment.MomentInput): string;
declare function dateHelper(this: Hexo__default, date: moment.MomentInput, format: string): string;
declare function timeHelper(this: Hexo__default, date: moment.MomentInput, format: string): string;
declare function fullDateHelper(this: Hexo__default & Record<string, any>, date: moment.MomentInput, format: string): string;
declare function relativeDateHelper(this: Hexo__default & Record<string, any>, date: moment.MomentInput): string;
declare function timeTagHelper(this: Hexo__default & Record<string, any>, date: moment.MomentInput, format: string): string;
/**
 * Convert Hexo language code to Moment locale code.
 * examples:
 *   default => en
 *   zh-CN => zh-cn
 *
 * Moment defined locales: https://github.com/moment/moment/tree/master/locale
 */
declare function toMomentLocales(lang: string): string;
declare const date: typeof dateHelper;
declare const date_xml: typeof toISOString;
declare const time: typeof timeHelper;
declare const full_date: typeof fullDateHelper;
declare const relative_date: typeof relativeDateHelper;
declare const time_tag: typeof timeTagHelper;

declare const toMomentLocale: moize.Moized<typeof toMomentLocales, Partial<{
    isDeepEqual: boolean;
    isPromise: boolean;
    isReact: boolean;
    isSerialized: boolean;
    isShallowEqual: boolean;
    matchesArg: moize.IsEqual;
    matchesKey: moize.IsMatchingKey;
    maxAge: number;
    maxArgs: number;
    maxSize: number;
    onCacheAdd: moize.OnCacheOperation<typeof toMomentLocales>;
    onCacheChange: moize.OnCacheOperation<typeof toMomentLocales>;
    onCacheHit: moize.OnCacheOperation<typeof toMomentLocales>;
    onExpire: moize.OnExpire;
    profileName: string;
    serializer: moize.Serialize;
    transformArgs: moize.TransformKey;
    updateCacheForKey: moize.UpdateCacheForKey;
    updateExpire: boolean;
}> & {
    isShallowEqual: true;
}>;

declare function getAuthor(hexo: Hexo): void;
declare function getTheAuthor(authorObj: Record<string, any> | string): string;

/**
 * hexo get post by key with name
 * @param by
 * @param filternames
 * @returns
 */
declare function getPostByLabelInternal(this: Hexo__default & Record<string, any>, by: 'tags' | 'categories', filternames: string[]): Record<string, string>[];
declare function getPostByLabel(hexo: Hexo__default): void;

declare const BASE_DIR: string;
/**
 * load all scripts
 * @param base
 */
declare function loadScripts(base: string): void;
declare function isObject(value: any): boolean;
declare function toArray(value: any): any;
/**
 * register custom helpers
 * @param hexo
 */
declare function registerCustomHelper(hexo: Hexo__default): void;

declare function partialWithLayout(ctx: Hexo__default): (this: Record<string, any>, name: string, locals: Hexo["locals"], options?: Record<string, any>) => any;

/**
 * get index of array of objects by property
 * @param array
 * @param searchTerm
 * @param property
 * @returns
 */
declare function objectArrayIndexOf<T extends any[]>(array: T, searchTerm: string, property: string): number;
/**
 * populate related posts
 * @param hexo hexo instance
 */
declare function getRelatedPosts(hexo: Hexo): void;

/**
 * Retrieves category names from input data.
 *
 * @param inCategories - The input category data, can be an array or an object with a `data` property.
 * @returns An array of category names or a formatted string of names if nested.
 */
declare function categoriesName(inCategories: any): any;
/**
 * Retrieves tag names from input data.
 *
 * @param inTags - The input tag data, can be an array or an object with a `data` property.
 * @returns An array of tag names.
 */
declare function tagName(inTags: any): any;
/** turn all type as partial recursively */
type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
declare const logname: string;
/**
 * check package installed
 * @param packageName
 * @returns
 */
declare function isPackageInstalled(packageName: string): boolean;

declare const headAndMetadataTags: string[];
declare const sectioningTags: string[];
declare const textContentTags: string[];
declare const listTags: string[];
declare const descriptionListTags: string[];
declare const formAndInputTags: string[];
declare const tableTags: string[];
declare const mediaTags: string[];
declare const scriptAndInteractiveTags: string[];
declare const obsoleteTags: string[];
declare const uncategorizedTags: string[];
declare const mathjaxTags: string[];
declare const texTags: string[];
declare const latexTags: string[];
declare const validHtmlTags: string[];
declare const validHtmlTagsRegex: RegExp;
declare function resolveValidHtmlTags(this: Hexo__default): string[];

declare const defaultMarkdownOptions: {
    preset: string;
    render: {
        html: boolean;
        xhtmlOut: boolean;
        langPrefix: string;
        breaks: boolean;
        linkify: boolean;
        typographer: boolean;
        quotes: string;
        cache: boolean;
    };
    enable_rules: any;
    disable_rules: any;
    plugins: (string | {
        name: string;
        options: Record<string, any>;
    })[];
    anchors: {
        level: number;
        collisionSuffix: string;
        permalink: boolean;
        permalinkClass: string;
        permalinkSide: string;
        permalinkSymbol: string;
        case: number;
        separator: string;
    };
    images: {
        lazyload: boolean;
        prepend_root: boolean;
        post_asset: boolean;
    };
    inline: boolean;
};
type rendererMarkdownItReturn = (data: Record<string, any>, options?: Record<string, any>) => string;
/**
 * hexo-renderer-markdown-it
 * @param hexo
 */
declare function rendererMarkdownIt(hexo: Hexo__default): rendererMarkdownItReturn;

type MarkdownItRendererOptions = string | {
    name: string;
    options?: Record<string, any>;
};

declare class MarkedRenderer extends marked.Renderer {
    heading({ text, depth }: marked.Tokens.Heading): string;
    link({ href, title, text }: marked.Tokens.Link): string;
    paragraph({ text }: marked.Tokens.Paragraph): string;
    image({ href, title, text }: marked.Tokens.Image): string;
}

declare class MarkedTokenizer extends marked.Tokenizer {
    url(_src: string): marked.Tokens.Link | undefined;
    inlineText(src: string): marked.Tokens.Text | undefined;
}

declare const defaultRendererMarkedOptions: {
    cache: boolean;
    gfm: boolean;
    pedantic: boolean;
    breaks: boolean;
    smartLists: boolean;
    smartypants: boolean;
    modifyAnchors: number;
    autolink: boolean;
    mangle: boolean;
    sanitizeUrl: boolean;
    dompurify: boolean;
    headerIds: boolean;
    anchorAlias: boolean;
    lazyload: boolean;
    prependRoot: boolean;
    postAsset: boolean;
    external_link: {
        enable: boolean;
        exclude: any[];
        nofollow: boolean;
    };
    descriptionLists: boolean;
};
type CustomMarkedOptions = MarkedOptions & typeof defaultRendererMarkedOptions & {
    [key: string]: any;
    _headingId: Record<string, any>;
    hexo: Hexo__default;
    postPath: string;
    figcaption?: boolean;
    quotes: string | any[];
};

declare function rendererMarkedNew(this: Hexo__default, data: Partial<HexoLocalsData>, options: marked.MarkedOptions): string;

/**
 * hexo-renderer-mathjax
 * @param hexo
 */
declare function rendererMathjax(hexo: Hexo): void;

/**
 * hexo-renderer-dartsass
 * @param hexo
 */
declare function rendererDartSass(hexo: Hexo__default): void;

/**
 * hexo-renderer-ejs
 * @param hexo
 */
declare function rendererEjs(hexo: Hexo__default): void;

declare function rendererMarked(hexo: Hexo__default): void;

/**
 * hexo-renderer-nunjucks
 * @param hexo
 */
declare function rendererNunjucks(hexo: Hexo__default): {
    render: {
        (data: PageSchema & Record<string, any>, locals: Partial<HexoLocalsData> & Record<string, any>): string;
        compile: (data: HexoRenderData & Record<string, any>) => {
            (context?: object): string;
            (context?: object, callback?: nunjucks.TemplateCallback<string>): void;
        };
    };
    rendererNunjucks: typeof rendererNunjucks;
    compile: (data: HexoRenderData & Record<string, any>) => {
        (context?: object): string;
        (context?: object, callback?: nunjucks.TemplateCallback<string>): void;
    };
};

/**
 * hexo-renderer-pug
 * @param hexo
 */
declare function rendererPug(hexo: Hexo__default): {
    (data: Record<string, any>, locals: Record<string, any>): string;
    compile: (data: Record<string, any>) => pug.compileTemplate;
};

declare function rendererSass(hexo: Hexo__default): void;

/**
 * @param data
 * @param options
 * @param callback
 */
declare function stylusFn(this: Hexo__default & Record<string, any>, data: Record<string, any>, options: Record<string, any>, callback: (err: Error | undefined | null, result: string) => any): void;
declare namespace stylusFn {
    var disableNunjucks: boolean;
}
/**
 * hexo-renderer-stylus
 * @param {import('hexo')} hexo
 */
declare function rendererStylus(hexo: any): void;

declare class HexoRollupConfigs {
    ctx: Hexo__default;
    constructor(ctx: Hexo__default);
    site(): any;
    theme(): any;
    overrideTheme(): any;
    merged(): RollupOptions;
}

declare function rendererRollup(hexo: Hexo__default): void;

declare const _rollupRenderAsync: (config: rollup.RollupOptions) => Promise<string>;

declare function getRawSiteConfig(name: string | symbol, ctx: Hexo__default): any;
declare function getRawThemeConfig(name: string | symbol, ctx: Hexo__default): any;
declare function getRawOverrideThemeConfig(name: string | symbol, ctx: Hexo__default): any | undefined;
declare function getRawConfigs(name: string | symbol, ctx: Hexo__default): {
    site: any;
    theme: any;
    override: any | undefined;
};
declare function getRawAllConfigs(ctx: Hexo__default): {
    site: Record<string, any>;
    theme: Record<string, any>;
    override: any | undefined;
};

/**
 * @param obj
 * @param keys
 */
declare const objectWithoutKeys: (obj: Record<string, any>, keys: string[]) => Record<string, any>;

type DeepWriteable<T> = {
    -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};

export { BASE_DIR, HexoRollupConfigs, MarkedRenderer, MarkedTokenizer, categoriesName, collectorPost, date, date_xml, defaultMarkdownOptions, defaultRendererMarkedOptions, descriptionListTags, escapeHtml, formAndInputTags, full_date, getAuthor, getPostByLabel, getPostByLabelInternal, getPostData, getRawAllConfigs, getRawConfigs, getRawOverrideThemeConfig, getRawSiteConfig, getRawThemeConfig, getRelatedPosts, getTheAuthor, headAndMetadataTags, htmlFixer, initCli, isObject, isPackageInstalled, latexTags, listTags, loadPostData, loadScripts, logname, mathjaxTags, mediaTags, metaJsonCreator, objectArrayIndexOf, objectWithoutKeys, obsoleteTags, partialWithLayout, postDataFilePath, registerCustomGenerator, registerCustomHelper, relative_date, rendererDartSass, rendererEjs, rendererMarkdownIt, rendererMarked, rendererMarkedNew, rendererMathjax, rendererNunjucks, rendererPug, rendererRollup, rendererSass, rendererStylus, resolveValidHtmlTags, _rollupRenderAsync as rollupRenderAsync, scriptAndInteractiveTags, sectioningTags, stylusFn, tableTags, tagName, texTags, textContentTags, time, time_tag, toArray, toMomentLocale, uncategorizedTags, validHtmlTags, validHtmlTagsRegex };
export type { CustomMarkedOptions, DeepPartial, DeepWriteable, HexoLocalsData, HexoRenderData, MarkdownItRendererOptions, Writeable, rendererMarkdownItReturn };
