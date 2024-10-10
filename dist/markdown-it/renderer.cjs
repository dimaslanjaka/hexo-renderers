"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var require_anchors = __commonJS({
  "src/markdown-it/anchors.js"(exports2, module2) {
    "use strict";
    var Token = require("markdown-it/lib/token");
    var { slugize } = require("hexo-util");
    var renderPermalink = function(slug, opts, tokens, idx) {
      const permalink = [
        Object.assign(new Token("link_open", "a", 1), {
          attrs: [
            ["class", opts.permalinkClass],
            ["href", "#" + slug]
          ]
        }),
        Object.assign(new Token("text", "", 0), {
          content: opts.permalinkSymbol
        }),
        new Token("link_close", "a", -1),
        Object.assign(new Token("text", "", 0), {
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
          let slug = slugize(title, slugOpts);
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
    module2.exports = anchor;
  }
});

// src/markdown-it/html-tags.js
var require_html_tags = __commonJS({
  "src/markdown-it/html-tags.js"(exports2, module2) {
    "use strict";
    var validHtmlTags2 = [
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "blockquote",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "body",
      "td",
      "template",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "u",
      "ul",
      "var",
      "video",
      "wbr"
    ];
    var validHtmlTagsRegex = new RegExp("</?(" + validHtmlTags2.join("|") + ")(\\s|>)");
    module2.exports = { validHtmlTags: validHtmlTags2, validHtmlTagsRegex };
  }
});

// src/markdown-it/images.js
var require_images = __commonJS({
  "src/markdown-it/images.js"(exports2, module2) {
    "use strict";
    var { join: join2, relative: relativePosix } = require("path").posix;
    var { relative, basename, extname, dirname, isAbsolute } = require("path");
    var { url_for } = require("hexo-util");
    function images(md, opts) {
      const { hexo: hexo2, images: images2 } = opts;
      const { lazyload, prepend_root: prependRoot, post_asset: postAsset } = images2;
      const { relative_link, model, base_dir, source_dir } = hexo2;
      md.renderer.rules.image = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const { postPath } = env;
        if (lazyload) {
          token.attrSet("loading", "lazy");
        }
        if (!prependRoot && !postAsset) {
          return self.renderToken(tokens, idx, options);
        }
        const srcIdx = token.attrs.findIndex((attr) => attr[0] === "src");
        let src = token.attrs[srcIdx][1];
        if (!/^(#|\/\/|http(s)?:)/.test(src) && !relative_link) {
          if (!(src.startsWith("/") || src.startsWith("\\")) && postAsset) {
            const PostAsset = model.call(hexo2, "PostAsset");
            let assetDirBasePath = join2(
              basename(source_dir),
              dirname(relativePosix(source_dir, postPath)),
              basename(postPath, extname(postPath))
            );
            if (isAbsolute(assetDirBasePath)) assetDirBasePath = relative(base_dir, assetDirBasePath);
            assetDirBasePath = assetDirBasePath.replace(/\\/g, "/");
            const asset = [
              join2(assetDirBasePath, src),
              join2(assetDirBasePath, src.replace(new RegExp("^" + basename(postPath, extname(postPath)) + "/"), ""))
            ].map((id) => PostAsset.findById(id)).filter(Boolean);
            if (asset.length) {
              src = asset[0].path.replace(/\\/g, "/");
            }
          }
          token.attrSet("src", url_for.call(hexo2, src));
        }
        return self.renderToken(tokens, idx, options);
      };
    }
    module2.exports = images;
  }
});

// src/markdown-it/renderer.ts
var renderer_exports = {};
__export(renderer_exports, {
  default: () => renderer_default,
  escapeHtml: () => escapeHtml
});
module.exports = __toCommonJS(renderer_exports);
var import_cheerio = require("cheerio");
var import_markdown_it = __toESM(require("markdown-it"));
var import_sbg_utility = require("sbg-utility");
var path = __toESM(require("upath"));
var import_anchors = __toESM(require_anchors());
var import_html_tags = __toESM(require_html_tags());
var import_images = __toESM(require_images());
var escapeHtml = (str) => {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};
var Renderer = class {
  /**
   * constructor
   *
   * @param hexo context of hexo
   */
  constructor(hexo2) {
    this.hexo = hexo2;
    let { markdown } = hexo2.config;
    if (typeof markdown === "string") {
      markdown = {
        preset: markdown
      };
      hexo2.log.warn(
        `Deprecated config detected. Please use

markdown:
  preset: ${markdown.preset}

See https://github.com/hexojs/hexo-renderer-markdown-it#options`
      );
    }
    const { preset, render, enable_rules, disable_rules, plugins, anchors, images } = markdown;
    this.parser = new import_markdown_it.default(preset, render);
    if (enable_rules) {
      this.parser.enable(enable_rules);
    }
    if (disable_rules) {
      this.parser.disable(disable_rules);
    }
    if (plugins) {
      this.parser = plugins.reduce((parser, pugs) => {
        if (pugs instanceof Object && pugs.name) {
          const resolved = require.resolve(pugs.name, {
            paths: [
              hexo2.base_dir,
              path.join(hexo2.base_dir, "node_modules"),
              path.join(__dirname, "../../"),
              path.join(__dirname, "../../node_modules")
            ]
          });
          return parser.use(require(resolved), pugs.options);
        } else if (typeof pugs === "string") {
          return parser.use(require(pugs));
        } else {
          return parser.use(require(require.resolve(pugs.name)), pugs.options);
        }
      }, this.parser);
    }
    if (anchors) {
      this.parser.use(import_anchors.default, anchors);
    }
    if (images) {
      this.parser.use(import_images.default, {
        images,
        hexo: this.hexo
      });
    }
    this.disableNunjucks = false;
  }
  render(data, _options) {
    this.hexo.execFilterSync("markdown-it:renderer", this.parser, { context: this });
    let html = this.parser.render(data.text, {
      postPath: data.path
    });
    const $ = (0, import_cheerio.load)(html);
    const regexs = [];
    $("*").each((index, element) => {
      const tagName = element.tagName.toLowerCase();
      if (!import_html_tags.validHtmlTags.includes(tagName)) {
        const regex = new RegExp("</?" + tagName + ">", "gm");
        regexs.push(regex);
      } else if (tagName === "img" || tagName === "source" || tagName === "iframe") {
        const src = $(element).attr("src");
        if (src && !(0, import_sbg_utility.isValidHttpUrl)(src) && !src.startsWith(this.hexo.config.root)) {
          const finalSrc = path.join(this.hexo.config.root, src);
          this.hexo.log.info("fix PAF", src, "->", finalSrc);
          html = html.replace(new RegExp((0, import_sbg_utility.escapeRegex)(src)), finalSrc);
        }
      }
    });
    const results = regexs.map((regex) => {
      const result = html.match(regex);
      if (typeof hexo != "undefined") {
        hexo.log.info("found invalid html tags inside anchor", regex, result);
      }
      return { regex, result };
    });
    const matches = results.flat();
    for (let i = 0; i < matches.length; i++) {
      const regex_result = matches[i];
      if (regex_result.result) {
        for (let i2 = 0; i2 < regex_result.result.length; i2++) {
          const replacement = escapeHtml(regex_result.result[i2]);
          html = html.replace(regex_result.regex, replacement);
        }
      }
    }
    return html;
  }
};
var renderer_default = Renderer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  escapeHtml
});
