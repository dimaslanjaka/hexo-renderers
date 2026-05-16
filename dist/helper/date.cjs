'use strict';

var moize = require('moize');
var moment = require('moment-timezone');

const { isMoment } = moment;
const isDate = (value) => typeof value === 'object' && value instanceof Date && !isNaN(value.getTime());
function getMoment(date, lang, timezone) {
    if (date == null)
        date = moment();
    if (!isMoment(date))
        date = moment(isDate(date) ? date : new Date(date));
    const toMomentLang = toMomentLocale(lang);
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
    const { config } = this;
    const moment = getMoment(date, getLanguage(this), config.timezone);
    return moment.format(format || config.date_format);
}
function timeHelper(date, format) {
    if (!date)
        return 'date is undefined';
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const { config } = this;
    const moment = getMoment(date, getLanguage(this), config.timezone);
    return moment.format(format || config.time_format);
}
function fullDateHelper(date, format) {
    if (!date)
        return 'date is undefined';
    if (format) {
        const moment = getMoment(date, getLanguage(this), this.config.timezone);
        return moment.format(format);
    }
    return `${this.date(date)} ${this.time(date)}`;
}
function relativeDateHelper(date) {
    if (!date)
        return 'date is undefined';
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const { config } = this;
    const moment = getMoment(date, getLanguage(this), config.timezone);
    return moment.fromNow();
}
function timeTagHelper(date, format) {
    if (!date)
        return 'date is undefined';
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const { config } = this;
    return `<time datetime="${toISOString(date)}">${this.date(date, format, getLanguage(this), config.timezone)}</time>`;
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
const date = dateHelper;
const date_xml = toISOString;
const time = timeHelper;
const full_date = fullDateHelper;
const relative_date = relativeDateHelper;
const time_tag = timeTagHelper;
const toMomentLocale = moize.shallow(toMomentLocales);

exports.moment = moment;
exports.date = date;
exports.date_xml = date_xml;
exports.full_date = full_date;
exports.relative_date = relative_date;
exports.time = time;
exports.time_tag = time_tag;
exports.toMomentLocale = toMomentLocale;
