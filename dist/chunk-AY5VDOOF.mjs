import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __esm
} from "./chunk-QAIXVEL3.mjs";

// src/helper/date.ts
import { default as moize } from "moize";
import moment from "moment-timezone";
function getMoment(date2, lang, timezone) {
  if (date2 == null) date2 = moment();
  if (!isMoment(date2)) date2 = moment(isDate(date2) ? date2 : new Date(date2));
  const toMomentLang = toMomentLocale(lang);
  if (toMomentLang) lang = toMomentLang;
  if (lang) date2 = date2.locale(lang);
  if (timezone) date2 = date2.tz(timezone);
  return date2;
}
function toISOString(date2) {
  if (date2 == null) {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  if (date2 instanceof Date || isMoment(date2)) {
    return date2.toISOString();
  }
  return new Date(date2).toISOString();
}
function dateHelper(date2, format) {
  if (!date2) return "date is undefined";
  const { config } = this;
  const moment2 = getMoment(date2, getLanguage(this), config.timezone);
  return moment2.format(format || config.date_format);
}
function timeHelper(date2, format) {
  if (!date2) return "date is undefined";
  const { config } = this;
  const moment2 = getMoment(date2, getLanguage(this), config.timezone);
  return moment2.format(format || config.time_format);
}
function fullDateHelper(date2, format) {
  if (!date2) return "date is undefined";
  if (format) {
    const moment2 = getMoment(date2, getLanguage(this), this.config.timezone);
    return moment2.format(format);
  }
  return `${this.date(date2)} ${this.time(date2)}`;
}
function relativeDateHelper(date2) {
  if (!date2) return "date is undefined";
  const { config } = this;
  const moment2 = getMoment(date2, getLanguage(this), config.timezone);
  return moment2.fromNow();
}
function timeTagHelper(date2, format) {
  if (!date2) return "date is undefined";
  const { config } = this;
  return `<time datetime="${toISOString(date2)}">${this.date(date2, format, getLanguage(this), config.timezone)}</time>`;
}
function getLanguage(ctx) {
  return ctx.page.lang || ctx.page.language || ctx.config.language;
}
function toMomentLocales(lang) {
  if (lang === void 0) {
    return void 0;
  }
  if (!lang || lang === "en" || lang === "default") {
    return "en";
  }
  return lang.toLowerCase().replace("_", "-");
}
var isMoment, isDate, date, date_xml, time, full_date, relative_date, time_tag, toMomentLocale;
var init_date = __esm({
  "src/helper/date.ts"() {
    ({ isMoment } = moment);
    isDate = (value) => typeof value === "object" && value instanceof Date && !isNaN(value.getTime());
    date = dateHelper;
    date_xml = toISOString;
    time = timeHelper;
    full_date = fullDateHelper;
    relative_date = relativeDateHelper;
    time_tag = timeTagHelper;
    toMomentLocale = moize.shallow(toMomentLocales);
  }
});

export {
  moment,
  date,
  date_xml,
  time,
  full_date,
  relative_date,
  time_tag,
  toMomentLocale,
  init_date
};
