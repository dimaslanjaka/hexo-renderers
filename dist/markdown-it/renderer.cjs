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

// src/markdown-it/renderer.ts
var renderer_exports = {};
__export(renderer_exports, {
  default: () => renderer_default,
  escapeHtml: () => escapeHtml
});
module.exports = __toCommonJS(renderer_exports);

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/markdown-it/renderer.ts
var import_cheerio = require("cheerio");
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_markdown_it = __toESM(require("markdown-it"), 1);
var import_module = require("module");
var import_sbg_utility2 = require("sbg-utility");
var import_upath = __toESM(require("upath"), 1);
var import_url = require("url");

// src/markdown-it/anchors.js
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

// src/markdown-it/html-tags.js
var import_sbg_utility = require("sbg-utility");
var headAndMetadataTags = ["base", "link", "meta", "style", "title", "head"];
var sectioningTags = ["article", "aside", "footer", "header", "main", "nav", "section", "body"];
var textContentTags = [
  "a",
  "abbr",
  "address",
  "b",
  "blockquote",
  "cite",
  "code",
  "del",
  "dfn",
  "em",
  "i",
  "ins",
  "kbd",
  "mark",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6"
];
var listTags = ["ul", "ol", "li"];
var descriptionListTags = ["dl", "dt", "dd"];
var formAndInputTags = [
  "button",
  "datalist",
  "fieldset",
  "form",
  "input",
  "label",
  "legend",
  "meter",
  "optgroup",
  "option",
  "output",
  "progress",
  "select",
  "textarea"
];
var tableTags = ["caption", "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"];
var mediaTags = [
  "area",
  "audio",
  "img",
  "map",
  "track",
  "video",
  "source",
  "picture",
  "iframe",
  "svg",
  "embed",
  "object",
  "param",
  "path",
  "circle",
  "rect",
  "line",
  "polygon",
  "polyline",
  "g",
  "defs",
  "symbol",
  "use",
  "svg"
];
var scriptAndInteractiveTags = ["canvas", "noscript", "script", "dialog", "template", "slot"];
var obsoleteTags = [
  "acronym",
  "basefont",
  "big",
  "center",
  "dir",
  "font",
  "frame",
  "frameset",
  "isindex",
  "keygen",
  "menu",
  "noframes",
  "tt"
];
var uncategorizedTags = [
  "bdi",
  "br",
  "data",
  "details",
  "div",
  "dl",
  "dt",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "hr",
  "html",
  "legend",
  "li",
  "link",
  "main",
  "mark",
  "meta",
  "meter",
  "nav",
  "object",
  "ol",
  "param",
  "pre",
  "progress",
  "template",
  "textarea",
  "time",
  "track",
  "wbr"
];
var mathjaxTags = [
  "math",
  // Root element for MathML equations
  "mrow",
  // Grouping element for sub-expressions
  "mi",
  // Mathematical identifier (e.g., variables)
  "mn",
  // Mathematical number
  "mo",
  // Mathematical operator (e.g., +, -, =)
  "msup",
  // Superscript element (e.g., exponents like x^2)
  "msub",
  // Subscript element (e.g., x₁)
  "msubsup",
  // Subscript and superscript together (e.g., x₁²)
  "mfrac",
  // Fraction (e.g., \(\frac{a}{b}\))
  "mroot",
  // nth root (e.g., \(\sqrt[n]{x}\))
  "msqrt",
  // Square root (e.g., \(\sqrt{x}\))
  "munder",
  // Underscript (e.g., for limits below sum or integral)
  "mover",
  // Overscript (e.g., \(\overline{x}\))
  "munderover",
  // Both underscript and overscript (e.g., summation with limits)
  "mspace",
  // Spacer for adding extra space
  "mfenced",
  // Parentheses or brackets around an expression (e.g., \( (x+y) \))
  "mtable",
  // Table for matrices or arrays
  "mtr",
  // Table row (for matrices or arrays)
  "mtd",
  // Table cell (for matrices or arrays)
  "mlabeledtr",
  // Table row with labels
  "semantics",
  // Provides semantic meaning or alternative representations
  "annotation"
  // Adds metadata or alternative forms (like LaTeX annotations)
];
var texTags = [
  "mtext",
  // Plain text in a mathematical expression
  "mpadded",
  // Adds padding around elements for spacing
  "mstyle"
  // Applies styling to MathML elements (font size, color, etc.)
];
var latexTags = [
  "annotation",
  // Adds LaTeX annotations inside MathML
  "msup",
  // Superscript element (e.g., for exponents in LaTeX)
  "msub",
  // Subscript element (e.g., LaTeX-style subscript)
  "msubsup",
  // Combined subscript and superscript (used in LaTeX expressions)
  "mfrac",
  // LaTeX fraction (e.g., \(\frac{a}{b}\))
  "msqrt",
  // LaTeX square root (e.g., \(\sqrt{x}\))
  "mroot",
  // nth root in LaTeX (e.g., \(\sqrt[n]{x}\))
  "munder",
  // Underscript (used for limits or accents in LaTeX)
  "mover",
  // Overscript (e.g., \(\overline{x}\) in LaTeX)
  "munderover"
  // Combination of underscript and overscript (for summations, integrals)
];
var validHtmlTags = (0, import_sbg_utility.array_unique)([
  ...headAndMetadataTags,
  ...sectioningTags,
  ...textContentTags,
  ...formAndInputTags,
  ...tableTags,
  ...mediaTags,
  ...scriptAndInteractiveTags,
  ...obsoleteTags,
  ...uncategorizedTags,
  ...texTags,
  ...mathjaxTags,
  ...latexTags,
  ...descriptionListTags,
  ...listTags
]);
var validHtmlTagsRegex = new RegExp("</?(" + validHtmlTags.join("|") + ")(\\s|>)");
function resolveValidHtmlTags() {
  const fromConfig = [];
  if (typeof hexo !== "undefined") {
    if (hexo.config.renderers) {
      const { html_tags = [] } = hexo.config.renderers;
      if (Array.isArray(html_tags)) fromConfig.push(...html_tags);
    }
  }
  return (0, import_sbg_utility.array_unique)(validHtmlTags.concat(fromConfig));
}

// src/markdown-it/images.js
var import_hexo_util2 = __toESM(require("hexo-util"), 1);
var path = __toESM(require("path"), 1);
var { basename, dirname, extname, isAbsolute, posix, relative } = path;
var { join, relative: relativePosix } = posix;
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
        let assetDirBasePath = join(
          basename(source_dir),
          dirname(relativePosix(source_dir, postPath)),
          basename(postPath, extname(postPath))
        );
        if (isAbsolute(assetDirBasePath)) assetDirBasePath = relative(base_dir, assetDirBasePath);
        assetDirBasePath = assetDirBasePath.replace(/\\/g, "/");
        const asset = [
          join(assetDirBasePath, src),
          join(assetDirBasePath, src.replace(new RegExp("^" + basename(postPath, extname(postPath)) + "/"), ""))
        ].map((id) => PostAsset.findById(id)).filter(Boolean);
        if (asset.length) {
          src = asset[0].path.replace(/\\/g, "/");
        }
      }
      token.attrSet("src", import_hexo_util2.default.url_for.call(hexo2, src));
    }
    return self.renderToken(tokens, idx, options);
  };
}
var images_default = images;

// src/markdown-it/renderer.ts
var __filename2 = (0, import_url.fileURLToPath)(importMetaUrl);
var __dirname = import_upath.default.dirname(__filename2);
if (typeof require === "undefined") global.require = (0, import_module.createRequire)(importMetaUrl);
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
    const { preset, render, enable_rules, disable_rules, plugins, anchors, images: images2 } = markdown;
    this.parser = new import_markdown_it.default(preset, render);
    if (enable_rules) {
      this.parser.enable(enable_rules, false);
    }
    if (disable_rules) {
      this.parser.disable(disable_rules, false);
    }
    if (plugins) {
      const node_modules_paths = [
        hexo2.base_dir,
        import_upath.default.join(hexo2.base_dir, "node_modules"),
        import_upath.default.join(process.cwd(), "node_modules"),
        // when installed inside node_modules
        import_upath.default.join(__dirname, "../../"),
        import_upath.default.join(__dirname, "../../node_modules"),
        import_upath.default.join(__dirname, "../../../node_modules")
      ].filter(import_fs_extra.default.existsSync);
      this.parser = plugins.reduce((parser, mdOpt) => {
        if (mdOpt instanceof Object && mdOpt.name) {
          const resolved = require.resolve(mdOpt.name, {
            paths: node_modules_paths
          });
          const r = require(resolved);
          if (typeof r === "function") return parser.use(r, mdOpt.options || {});
          hexo2.log.error(`markdown-it plugin ${mdOpt.name} is not a function`);
        } else if (typeof mdOpt === "string") {
          const resolved = require.resolve(mdOpt, {
            paths: node_modules_paths
          });
          const r = require(resolved);
          if (typeof r === "function") return parser.use(r);
          hexo2.log.error(`markdown-it plugin ${mdOpt} is not a function`);
        } else {
          hexo2.log.error(`markdown-it plugin failed load ${mdOpt}`);
        }
        return parser;
      }, this.parser);
    }
    if (anchors) {
      this.parser.use(anchors_default, anchors);
    }
    if (images2) {
      this.parser.use(images_default, {
        images: images2,
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
      if (!resolveValidHtmlTags().includes(tagName)) {
        const regex = new RegExp("</?" + tagName + ">", "gm");
        regexs.push(regex);
      } else if (tagName === "img" || tagName === "source" || tagName === "iframe") {
        const src = $(element).attr("src");
        if (src && !(0, import_sbg_utility2.isValidHttpUrl)(src) && !src.startsWith(this.hexo.config.root) && !src.startsWith("//")) {
          const finalSrc = import_upath.default.join(this.hexo.config.root, src);
          this.hexo.log.info("fix PAF", src, "->", finalSrc);
          html = html.replace(new RegExp((0, import_sbg_utility2.escapeRegex)(src)), finalSrc);
        }
      }
    });
    const results = regexs.map((regex) => {
      const result = html.match(regex);
      if (typeof hexo != "undefined") {
        hexo.log.warn("found invalid html tags inside anchor", regex, result);
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
