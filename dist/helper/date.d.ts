import Hexo from 'hexo';
import moment from 'moment-timezone';
declare function toISOString(date: moment.MomentInput): string;
declare function dateHelper(this: Hexo, date: moment.MomentInput, format: string): string;
declare function timeHelper(this: Hexo, date: moment.MomentInput, format: string): string;
declare function fullDateHelper(this: Hexo & Record<string, any>, date: moment.MomentInput, format: string): string;
declare function relativeDateHelper(this: Hexo & Record<string, any>, date: moment.MomentInput): string;
declare function timeTagHelper(this: Hexo & Record<string, any>, date: moment.MomentInput, format: string): string;
/**
 * Convert Hexo language code to Moment locale code.
 * examples:
 *   default => en
 *   zh-CN => zh-cn
 *
 * Moment defined locales: https://github.com/moment/moment/tree/master/locale
 */
declare function toMomentLocales(lang: string): string | undefined;
export declare const date: typeof dateHelper;
export declare const date_xml: typeof toISOString;
export declare const time: typeof timeHelper;
export declare const full_date: typeof fullDateHelper;
export declare const relative_date: typeof relativeDateHelper;
export declare const time_tag: typeof timeTagHelper;
export { moment };
export declare const toMomentLocale: import("moize").Moized<typeof toMomentLocales, Partial<{
    isDeepEqual: boolean;
    isPromise: boolean;
    isReact: boolean;
    isSerialized: boolean;
    isShallowEqual: boolean;
    matchesArg: import("moize").IsEqual;
    matchesKey: import("moize").IsMatchingKey;
    maxAge: number;
    maxArgs: number;
    maxSize: number;
    onCacheAdd: import("moize").OnCacheOperation<typeof toMomentLocales>;
    onCacheChange: import("moize").OnCacheOperation<typeof toMomentLocales>;
    onCacheHit: import("moize").OnCacheOperation<typeof toMomentLocales>;
    onExpire: import("moize").OnExpire;
    profileName: string;
    serializer: import("moize").Serialize;
    /**
     * Convert Hexo language code to Moment locale code.
     * examples:
     *   default => en
     *   zh-CN => zh-cn
     *
     * Moment defined locales: https://github.com/moment/moment/tree/master/locale
     */
    transformArgs: import("moize").TransformKey;
    updateCacheForKey: import("moize").UpdateCacheForKey;
    updateExpire: boolean;
}> & {
    isShallowEqual: true;
}>;
