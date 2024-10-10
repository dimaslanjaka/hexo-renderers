import * as moize from 'moize';
import Hexo__default from 'hexo';
import moment from 'moment-timezone';
export { default as moment } from 'moment-timezone';

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
declare function toMomentLocales(lang: string): string | undefined;
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

export { date, date_xml, full_date, relative_date, time, time_tag, toMomentLocale };
