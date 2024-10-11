"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/helper/date.ts
var date_exports = {};
__export(date_exports, {
  date: () => date,
  date_xml: () => date_xml,
  full_date: () => full_date,
  moment: () => import_moment_timezone.default,
  relative_date: () => relative_date,
  time: () => time,
  time_tag: () => time_tag,
  toMomentLocale: () => toMomentLocale
});
module.exports = __toCommonJS(date_exports);
var import_moize = __toESM(require("moize"), 1);
var import_moment_timezone = __toESM(require("moment-timezone"), 1);
var { isMoment } = import_moment_timezone.default;
var isDate = (value) => typeof value === "object" && value instanceof Date && !isNaN(value.getTime());
function getMoment(date2, lang, timezone) {
  if (date2 == null) date2 = (0, import_moment_timezone.default)();
  if (!isMoment(date2)) date2 = (0, import_moment_timezone.default)(isDate(date2) ? date2 : new Date(date2));
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
var date = dateHelper;
var date_xml = toISOString;
var time = timeHelper;
var full_date = fullDateHelper;
var relative_date = relativeDateHelper;
var time_tag = timeTagHelper;
var toMomentLocale = import_moize.default.shallow(toMomentLocales);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  date,
  date_xml,
  full_date,
  moment,
  relative_date,
  time,
  time_tag,
  toMomentLocale
});
