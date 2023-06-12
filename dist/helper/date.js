'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMomentLocale = exports.moment = exports.time_tag = exports.relative_date = exports.full_date = exports.time = exports.date_xml = exports.date = void 0;
var moize_1 = __importDefault(require("moize"));
var moment_timezone_1 = __importDefault(require("moment-timezone"));
exports.moment = moment_timezone_1.default;
var isMoment = moment_timezone_1.default.isMoment;
var isDate = function (value) {
    return typeof value === 'object' && value instanceof Date && !isNaN(value.getTime());
};
function getMoment(date, lang, timezone) {
    if (date == null)
        date = (0, moment_timezone_1.default)();
    if (!isMoment(date))
        date = (0, moment_timezone_1.default)(isDate(date) ? date : new Date(date));
    var toMomentLang = (0, exports.toMomentLocale)(lang);
    if (toMomentLang)
        lang = toMomentLang;
    if (lang)
        date = date.locale(lang);
    if (timezone)
        date = date.tz(timezone);
    return date;
}
function toISOString(date) {
    if (date == null) {
        return new Date().toISOString();
    }
    if (date instanceof Date || isMoment(date)) {
        return date.toISOString();
    }
    return new Date(date).toISOString();
}
function dateHelper(date, format) {
    if (!date)
        return 'date is undefined';
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var config = this.config;
    var moment = getMoment(date, getLanguage(this), config.timezone);
    return moment.format(format || config.date_format);
}
function timeHelper(date, format) {
    if (!date)
        return 'date is undefined';
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var config = this.config;
    var moment = getMoment(date, getLanguage(this), config.timezone);
    return moment.format(format || config.time_format);
}
function fullDateHelper(date, format) {
    if (!date)
        return 'date is undefined';
    if (format) {
        var moment_1 = getMoment(date, getLanguage(this), this.config.timezone);
        return moment_1.format(format);
    }
    return "".concat(this.date(date), " ").concat(this.time(date));
}
function relativeDateHelper(date) {
    if (!date)
        return 'date is undefined';
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var config = this.config;
    var moment = getMoment(date, getLanguage(this), config.timezone);
    return moment.fromNow();
}
function timeTagHelper(date, format) {
    if (!date)
        return 'date is undefined';
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var config = this.config;
    return "<time datetime=\"".concat(toISOString(date), "\">").concat(this.date(date, format, getLanguage(this), config.timezone), "</time>");
}
function getLanguage(ctx) {
    return ctx.page.lang || ctx.page.language || ctx.config.language;
}
/**
 * Convert Hexo language code to Moment locale code.
 * examples:
 *   default => en
 *   zh-CN => zh-cn
 *
 * Moment defined locales: https://github.com/moment/moment/tree/master/locale
 */
function toMomentLocales(lang) {
    if (lang === undefined) {
        return undefined;
    }
    // moment.locale('') equals moment.locale('en')
    // moment.locale(null) equals moment.locale('en')
    if (!lang || lang === 'en' || lang === 'default') {
        return 'en';
    }
    return lang.toLowerCase().replace('_', '-');
}
exports.date = dateHelper;
exports.date_xml = toISOString;
exports.time = timeHelper;
exports.full_date = fullDateHelper;
exports.relative_date = relativeDateHelper;
exports.time_tag = timeTagHelper;
exports.toMomentLocale = moize_1.default.shallow(toMomentLocales);
