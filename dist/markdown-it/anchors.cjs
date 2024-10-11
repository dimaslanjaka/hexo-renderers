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

// src/markdown-it/anchors.js
var anchors_exports = {};
__export(anchors_exports, {
  default: () => anchors_default
});
module.exports = __toCommonJS(anchors_exports);
var import_hexo_util = __toESM(require("hexo-util"), 1);
var import_token = __toESM(require("markdown-it/token"), 1);
var renderPermalink = function(slug, opts, tokens, idx) {
  const permalink = [
    Object.assign(new import_token.default("link_open", "a", 1), {
      attrs: [
        ["class", opts.permalinkClass],
        ["href", "#" + slug]
      ]
    }),
    Object.assign(new import_token.default("text", "", 0), {
      content: opts.permalinkSymbol
    }),
    new import_token.default("link_close", "a", -1),
    Object.assign(new import_token.default("text", "", 0), {
      content: ""
    })
  ];
  if (opts.permalinkSide === "right") {
    return tokens[idx + 1].children.push(...permalink);
  }
  return tokens[idx + 1].children.unshift(...permalink);
};
var anchor = function(md, opts) {
  Object.assign(opts, { renderPermalink });
  let titleStore = {};
  const originalHeadingOpen = md.renderer.rules.heading_open;
  const slugOpts = { transform: opts.case, ...opts };
  md.renderer.rules.heading_open = function(...args) {
    const [tokens, idx, _something, _somethingelse, self] = args;
    if (tokens[idx].tag.substr(1) >= opts.level) {
      let _tokens$idx;
      const title = tokens[idx + 1].children.reduce((acc, t) => {
        return acc + t.content;
      }, "");
      let slug = import_hexo_util.default.slugize(title, slugOpts);
      if (Object.prototype.hasOwnProperty.call(titleStore, slug)) {
        titleStore[slug] = titleStore[slug] + 1;
        slug = slug + "-" + opts.collisionSuffix + titleStore[slug].toString();
      } else {
        titleStore[slug] = 1;
      }
      (_tokens$idx = tokens[idx], !_tokens$idx.attrs && (_tokens$idx.attrs = []), _tokens$idx.attrs).push([
        "id",
        slug
      ]);
      if (opts.permalink) {
        opts.renderPermalink.apply(opts, [slug, opts].concat(args));
      }
    }
    return originalHeadingOpen ? originalHeadingOpen.apply(this, args) : self.renderToken.apply(self, args);
  };
  md.core.ruler.push("clear_anchor_title_store", () => {
    titleStore = {};
  });
};
var anchors_default = anchor;
