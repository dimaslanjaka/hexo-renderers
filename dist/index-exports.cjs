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

// src/index-exports.ts
var index_exports_exports = {};
__export(index_exports_exports, {
  rendererDartSass: () => rendererDartSass,
  rendererEjs: () => rendererEjs,
  rendererMarkdownIt: () => rendererMarkdownIt,
  rendererNunjucks: () => rendererNunjucks,
  rendererPug: () => rendererPug,
  rendererRollup: () => rendererRollup,
  rendererSass: () => rendererSass,
  rendererStylus: () => rendererStylus
});
module.exports = __toCommonJS(index_exports_exports);

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/renderer-dartsass.ts
var import_sass = __toESM(require("sass"), 1);
function rendererDartSass(hexo2) {
  const make = function(data, _options) {
    const config2 = Object.assign(this.theme.config.sass || {}, this.config.sass || {}, { file: data.path });
    return new Promise((resolve, reject) => {
      import_sass.default.compileAsync(data.path, config2).then(function(result) {
        resolve(result.css);
      }).catch(reject);
    });
  };
  hexo2.extend.renderer.register("scss", "css", make);
  hexo2.extend.renderer.register("sass", "css", make);
}

// src/renderer-ejs.ts
var ejs = __toESM(require("ejs"), 1);

// src/helper/index.ts
var import_fs = __toESM(require("fs"), 1);
var hexoUtil = __toESM(require("hexo-util"), 1);
var import_lodash2 = __toESM(require("lodash"), 1);
var import_module = require("module");
var import_path = __toESM(require("path"), 1);
var import_yaml = __toESM(require("yaml"), 1);

// src/helper/date.ts
var import_moize = __toESM(require("moize"), 1);
var import_moment_timezone = __toESM(require("moment-timezone"), 1);
var { isMoment } = import_moment_timezone.default;
function toMomentLocales(lang) {
  if (lang === void 0) {
    return void 0;
  }
  if (!lang || lang === "en" || lang === "default") {
    return "en";
  }
  return lang.toLowerCase().replace("_", "-");
}
var toMomentLocale = import_moize.default.shallow(toMomentLocales);

// src/helper/partial.ts
var path = __toESM(require("upath"), 1);

// src/helper/related-posts.ts
var import_fs_extra2 = __toESM(require("fs-extra"), 1);
var import_lodash = __toESM(require("lodash"), 1);
var import_sbg_utility2 = require("sbg-utility");

// src/helper/collector.ts
var cheerio = __toESM(require("cheerio"), 1);
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_sbg_utility = require("sbg-utility");

// src/helper/util.ts
var import_ansi_colors = __toESM(require("ansi-colors"), 1);
var logname = import_ansi_colors.default.magentaBright("hexo-renderers");

// src/helper/related-posts.ts
var assign = import_lodash.default.assign;

// src/helper/index.ts
if (typeof require === "undefined") global.require = (0, import_module.createRequire)(importMetaUrl);
var _toArray = import_lodash2.default.toArray;
var BASE_DIR = typeof hexo === "undefined" ? process.cwd() : hexo.base_dir;
var configFile = import_path.default.join(BASE_DIR, "_config.yml");
var config = {};
if (import_fs.default.existsSync(configFile)) {
  if (typeof hexo === "undefined") {
    config = import_yaml.default.parse(import_fs.default.readFileSync(configFile, "utf-8"));
  } else {
    config = hexo.config;
  }
}
var THEME_LOCATION = import_path.default.join(process.cwd(), "themes", config.theme || "landscape");
var _THEME_SCRIPTS = import_path.default.join(THEME_LOCATION, "scripts");
function isObject(value) {
  return typeof value === "object" && value !== null && value !== void 0;
}
function toArray(value) {
  if (isObject(value) && typeof value.toArray === "function") {
    return value.toArray();
  } else if (Array.isArray(value)) {
    return value;
  }
  return _toArray(value);
}

// src/renderer-ejs.ts
function rendererEjs(hexo2) {
  if (ejs.filters) ejs.filters.toArray = toArray;
  function ejsRenderer(data, locals) {
    return ejs.render(data.text, Object.assign({ filename: data.path }, locals));
  }
  ejsRenderer.compile = function(data) {
    return ejs.compile(data.text, {
      filename: data.path
    });
  };
  hexo2.extend.renderer.register("ejs", "html", ejsRenderer, true);
}

// src/markdown-it/renderer.ts
var import_cheerio = require("cheerio");
var import_fs_extra3 = __toESM(require("fs-extra"), 1);
var import_markdown_it = __toESM(require("markdown-it"), 1);
var import_module2 = require("module");
var import_sbg_utility4 = require("sbg-utility");
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
var import_sbg_utility3 = require("sbg-utility");
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
var validHtmlTags = (0, import_sbg_utility3.array_unique)([
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
  return (0, import_sbg_utility3.array_unique)(validHtmlTags.concat(fromConfig));
}

// src/markdown-it/images.js
var import_hexo_util2 = __toESM(require("hexo-util"), 1);
var path3 = __toESM(require("path"), 1);
var { basename, dirname: dirname2, extname, isAbsolute, posix, relative } = path3;
var { join: join2, relative: relativePosix } = posix;
function images(md, opts) {
  const { hexo: hexo2, images: images2 } = opts;
  const { lazyload, prepend_root: prependRoot, post_asset: postAsset } = images2;
  const { relative_link, model, base_dir: base_dir2, source_dir } = hexo2;
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
          dirname2(relativePosix(source_dir, postPath)),
          basename(postPath, extname(postPath))
        );
        if (isAbsolute(assetDirBasePath)) assetDirBasePath = relative(base_dir2, assetDirBasePath);
        assetDirBasePath = assetDirBasePath.replace(/\\/g, "/");
        const asset = [
          join2(assetDirBasePath, src),
          join2(assetDirBasePath, src.replace(new RegExp("^" + basename(postPath, extname(postPath)) + "/"), ""))
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
if (typeof require === "undefined") global.require = (0, import_module2.createRequire)(importMetaUrl);
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
    const { preset, render: render2, enable_rules, disable_rules, plugins, anchors, images: images2 } = markdown;
    this.parser = new import_markdown_it.default(preset, render2);
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
      ].filter(import_fs_extra3.default.existsSync);
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
      const tagName2 = element.tagName.toLowerCase();
      if (!resolveValidHtmlTags().includes(tagName2)) {
        const regex = new RegExp("</?" + tagName2 + ">", "gm");
        regexs.push(regex);
      } else if (tagName2 === "img" || tagName2 === "source" || tagName2 === "iframe") {
        const src = $(element).attr("src");
        if (src && !(0, import_sbg_utility4.isValidHttpUrl)(src) && !src.startsWith(this.hexo.config.root) && !src.startsWith("//")) {
          const finalSrc = import_upath.default.join(this.hexo.config.root, src);
          this.hexo.log.info("fix PAF", src, "->", finalSrc);
          html = html.replace(new RegExp((0, import_sbg_utility4.escapeRegex)(src)), finalSrc);
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

// src/renderer-markdown-it.ts
var defaultMarkdownOptions = {
  preset: "default",
  render: {
    html: true,
    xhtmlOut: false,
    langPrefix: "language-",
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: "\u201C\u201D\u2018\u2019"
  },
  enable_rules: null,
  disable_rules: null,
  plugins: [
    "markdown-it-abbr",
    "markdown-it-attrs",
    "markdown-it-bracketed-spans",
    "markdown-it-sup",
    "markdown-it-cjk-breaks",
    "markdown-it-sub",
    "markdown-it-deflist",
    "markdown-it-footnote",
    "markdown-it-ins",
    "markdown-it-mark",
    {
      name: "markdown-it-emoji",
      options: {
        shortcuts: {
          laughing: ":D"
        }
      }
    }
  ],
  anchors: {
    level: 2,
    collisionSuffix: "",
    permalink: false,
    permalinkClass: "header-anchor",
    permalinkSide: "left",
    permalinkSymbol: "\xB6",
    case: 0,
    separator: "-"
  },
  images: {
    lazyload: false,
    prepend_root: false,
    post_asset: false
  }
};
function rendererMarkdownIt(hexo2) {
  hexo2.config.markdown = Object.assign(
    {
      preset: "default",
      render: {},
      anchors: {}
    },
    defaultMarkdownOptions,
    // fallback to empty object when `markdown` options is undefined
    hexo2.config.markdown || {}
  );
  hexo2.config.markdown.render = Object.assign(
    {
      html: true,
      xhtmlOut: false,
      breaks: true,
      linkify: true,
      typographer: true,
      quotes: "\u201C\u201D\u2018\u2019"
    },
    hexo2.config.markdown.render || {}
  );
  hexo2.config.markdown.anchors = Object.assign(
    {
      level: 2,
      collisionSuffix: "",
      permalink: false,
      permalinkClass: "header-anchor",
      permalinkSide: "left",
      permalinkSymbol: "\xB6",
      case: 0,
      separator: "-"
    },
    hexo2.config.markdown.anchors || {}
  );
  const renderer2 = new renderer_default(hexo2);
  if (typeof hexo2.config.markdown.disableNunjucks !== "boolean") {
    renderer2.disableNunjucks = hexo2.config.markdown.disableNunjucks === "true";
  }
  function render2(data, options = {}) {
    return renderer2.render(data, options);
  }
  hexo2.extend.renderer.register("md", "html", render2, true);
  hexo2.extend.renderer.register("markdown", "html", render2, true);
  hexo2.extend.renderer.register("mkd", "html", render2, true);
  hexo2.extend.renderer.register("mkdn", "html", render2, true);
  hexo2.extend.renderer.register("mdwn", "html", render2, true);
  hexo2.extend.renderer.register("mdtxt", "html", render2, true);
  hexo2.extend.renderer.register("mdtext", "html", render2, true);
  return render2;
}

// src/renderer-nunjucks.ts
var import_fs_extra4 = __toESM(require("fs-extra"), 1);
var import_nunjucks = __toESM(require("nunjucks"), 1);
var import_upath2 = __toESM(require("upath"), 1);
var import_sbg_utility5 = require("sbg-utility");
var base_dir = typeof hexo !== "undefined" && hexo.base_dir ? hexo.base_dir : process.cwd();
var tmpdir = import_upath2.default.join(base_dir, "tmp", "hexo-renderers");
var logfile = import_upath2.default.join(tmpdir, "nunjucks-log.json");
function rendererNunjucks(hexo2) {
  const themeDir = import_upath2.default.join(hexo2.base_dir, "themes", hexo2.config.theme);
  const env = import_nunjucks.default.configure([themeDir, import_upath2.default.join(themeDir, "layout")], {
    noCache: true,
    autoescape: false,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false
  });
  env.addFilter("toArray", toArray);
  const logs = {
    render: [],
    compile: []
  };
  function render2(data, locals) {
    if ("text" in data) {
      return import_nunjucks.default.renderString(data.text, locals);
    }
    logs.render.push(data.path);
    (0, import_sbg_utility5.writefile)(logfile, JSON.stringify(logs, null, 2));
    return import_nunjucks.default.render(data.path, locals);
  }
  function compile3(data) {
    logs.compile.push(data.path);
    (0, import_sbg_utility5.writefile)(logfile, JSON.stringify(logs, null, 2));
    const compiled = import_nunjucks.default.compile(
      "text" in data ? data.text : import_fs_extra4.default.readFileSync(data.path, "utf-8"),
      env
    );
    return compiled.render.bind(compiled);
  }
  render2.compile = compile3;
  hexo2.extend.renderer.register("njk", "html", render2, false);
  hexo2.extend.renderer.register("j2", "html", render2, false);
  return { render: render2, rendererNunjucks, compile: compile3 };
}

// src/renderer-pug.ts
var import_module3 = require("module");
var path6 = __toESM(require("path"), 1);
var pug = __toESM(require("pug"), 1);
if (typeof require === "undefined") global.require = (0, import_module3.createRequire)(importMetaUrl);
function rendererPug(hexo2) {
  const configPath = path6.join(process.cwd(), "pug.config");
  const defaultConfig = { compile: {} };
  let hasConfig = true;
  try {
    require.resolve(configPath);
  } catch {
    hasConfig = false;
  }
  const config2 = hasConfig ? require(configPath) : defaultConfig;
  const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  const invalidKeys = Object.keys(config2).filter((k) => !hasProp(defaultConfig, k));
  if (invalidKeys.length > 0) {
    throw Error(`Unsupported PUG config keys: ${invalidKeys.join(", ")}`);
  }
  function pugCompile(data) {
    const opts = {
      ...config2.compile,
      filename: data.path
      // always used
    };
    return pug.compile(data.text, opts);
  }
  function pugRenderer(data, locals) {
    return pugCompile(data)(locals);
  }
  pugRenderer.compile = pugCompile;
  hexo2.extend.renderer.register("pug", "html", pugRenderer, true);
  return pugRenderer;
}

// src/renderer-sass.ts
var import_node_sass = __toESM(require("node-sass"), 1);
var import_path2 = __toESM(require("path"), 1);
var extend = Object.assign;
var sassRenderer = (ext) => function(data) {
  const userConfig = extend(this.theme.config.node_sass || {}, this.config.node_sass || {});
  const config2 = extend(
    {
      data: data.text,
      file: data.path,
      outputStyle: "nested",
      sourceComments: false,
      indentedSyntax: ext === "sass"
    },
    userConfig
  );
  if (typeof config2.includePaths === "string") {
    config2.includePaths = [config2.includePaths];
  } else if (!config2.includePaths) {
    config2.includePaths = [];
  }
  config2.includePaths.push(
    import_path2.default.join(hexo.base_dir, "node_modules"),
    import_path2.default.join(hexo.theme_dir, "node_modules")
  );
  try {
    const result = import_node_sass.default.renderSync(config2);
    return Promise.resolve(result.css.toString());
  } catch (error) {
    console.error(error.toString());
    throw error;
  }
};
function rendererSass(hexo2) {
  hexo2.extend.renderer.register("scss", "css", sassRenderer("scss"));
  hexo2.extend.renderer.register("sass", "css", sassRenderer("sass"));
}

// src/renderer-stylus.ts
var import_module4 = require("module");
var import_stylus = __toESM(require("stylus"), 1);
if (typeof require === "undefined") global.require = (0, import_module4.createRequire)(importMetaUrl);
function getProperty(obj, name) {
  name = name.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "");
  const split = name.split(".");
  let key = split.shift();
  if (!key) return "";
  if (!Object.prototype.hasOwnProperty.call(obj, key)) return "";
  let result = obj[key];
  const len = split.length;
  if (!len) {
    if (result === 0) return result;
    return result || "";
  }
  if (typeof result !== "object") return "";
  for (let i = 0; i < len; i++) {
    key = split[i];
    if (!Object.prototype.hasOwnProperty.call(result, key)) return "";
    result = result[split[i]];
    if (typeof result !== "object") return result;
  }
  return result;
}
function applyPlugins(stylusConfig, plugins) {
  plugins.forEach((plugin) => {
    const factoryFn = require(plugin.trim());
    stylusConfig.use(factoryFn());
  });
}
function stylusFn(data, options, callback) {
  const self = this;
  const config2 = self.config.stylus || {};
  const plugins = ["nib"].concat(config2.plugins || []);
  function defineConfig(style) {
    style.define("hexo-config", (data2) => {
      return getProperty(self.theme.config, data2.val);
    });
  }
  const stylusConfig = (0, import_stylus.default)(data.text);
  applyPlugins(stylusConfig, plugins);
  stylusConfig.use(defineConfig).use((style) => self.execFilterSync("stylus:renderer", style, { context: this })).set("filename", data.path).set("sourcemap", config2.sourcemaps).set("compress", config2.compress).set("include css", true).render(callback);
}
stylusFn.disableNunjucks = true;
function rendererStylus(hexo2) {
  hexo2.extend.renderer.register("styl", "css", stylusFn);
  hexo2.extend.renderer.register("stylus", "css", stylusFn);
}

// src/renderer/rollup/renderer.js
var import_path3 = require("path");
var import_rollup = require("rollup");
var import_sbg_utility6 = require("sbg-utility");

// src/renderer/rollup/utils/createReadFilterProxy.js
var createReadFilterProxy = (target, filters2 = {}) => {
  if (target == null || typeof target !== "object") {
    throw new TypeError();
  }
  let filterKeys = Object.keys(filters2).filter((key) => typeof filters2[key] === "function");
  if (!filterKeys) {
    return target;
  }
  const filtersMap = filterKeys.reduce((result, key) => {
    result[key] = filters2[key];
    return result;
  }, /* @__PURE__ */ Object.create(null));
  filters2 = null;
  filterKeys = null;
  return new Proxy(target, {
    get(target2, property, receiver) {
      const original = Reflect.get(target2, property, receiver);
      return property in filtersMap ? filtersMap[property](original, target2) : original;
    }
  });
};
var createReadFilterProxy_default = createReadFilterProxy;

// src/renderer/rollup/utils/objectWithoutKeys.ts
var objectWithoutKeys = (obj, keys) => {
  if (!Array.isArray(keys)) {
    throw new TypeError("keys most string[].");
  }
  return Object.keys(obj).reduce(
    (newObject, key) => {
      if (!keys.includes(key)) newObject[key] = obj[key];
      return newObject;
    },
    {}
  );
};

// src/renderer/rollup/utils/rollupPluginFromName.js
var import_module5 = require("module");
if (typeof require === "undefined") global.require = (0, import_module5.createRequire)(importMetaUrl);
var rollupPluginFromName = (name) => {
  if (typeof name !== "string") {
    throw new TypeError("name most string");
  }
  const pluginPrefix = "rollup-plugin-";
  if (!name.startsWith(pluginPrefix)) {
    name = pluginPrefix + name;
  }
  return require(name);
};
var rollupPluginFromName_default = rollupPluginFromName;

// src/renderer/rollup/utils/createRollupPlugin.js
var createRollupPlugin = (config2) => {
  if (typeof config2 === "string") {
    return rollupPluginFromName_default(config2)({});
  }
  if (typeof config2 === "object" && "name" in config2) {
    const plugin = rollupPluginFromName_default(config2.name);
    const options = objectWithoutKeys(config2, ["name"]);
    return plugin(options);
  }
  throw new TypeError("config most object!");
};
var createRollupPlugin_default = createRollupPlugin;

// src/renderer/rollup/utils/getHexoConfigs.js
var mostHexoTypeError = () => {
  throw new TypeError("ctx most Hexo instance!");
};
var getRawSiteConfig = (name, ctx) => {
  if (!ctx) {
    mostHexoTypeError();
  }
  return ctx.config[name];
};
var getRawThemeConfig = (name, ctx) => {
  if (!ctx) {
    mostHexoTypeError();
  }
  return ctx.theme.config[name];
};
var getRawOverrideThemeConfig = (name, ctx) => {
  if (!ctx) {
    mostHexoTypeError();
  }
  if (ctx.config.theme_config == null) {
    return void 0;
  }
  return ctx.config.theme_config[name];
};

// src/renderer/rollup/utils/toAbsolutePaths.js
var path8 = __toESM(require("path"), 1);

// src/renderer/rollup/utils/objectMap.js
var objectMap = (obj, callback, thisArg = void 0) => {
  if (obj == null) {
    throw new TypeError();
  }
  if (Array.isArray(obj)) {
    return obj.map(callback, thisArg);
  }
  const type = typeof obj;
  if (type !== "object" && type !== "string") {
    throw new TypeError();
  }
  if (typeof obj[Symbol.iterator] === "function") {
    return Array.from(obj, callback, thisArg);
  }
  if (typeof obj.length === "number") {
    return Array.from(obj, callback, thisArg);
  }
  return Object.values(obj).map(callback, thisArg);
};
var objectMap_default = objectMap;

// src/renderer/rollup/utils/toAbsolutePaths.js
var toAbsolutePath = (targets, base) => {
  if (targets == null) {
    return [];
  }
  if (typeof targets === "string") {
    if (path8.isAbsolute(targets)) {
      return targets;
    }
    return path8.join(base, targets);
  }
  return objectMap_default(targets, (x) => {
    return path8.isAbsolute(x) ? x : path8.join(base, x);
  });
};
var toAbsolutePaths_default = toAbsolutePath;

// src/renderer/rollup/HexoRollupConfigs.ts
var configFilterProxy = (config2, baseDir) => {
  if (config2 == null) {
    return config2;
  }
  return createReadFilterProxy_default(config2, {
    input(original, target) {
      return "input" in target ? toAbsolutePaths_default(original, baseDir) : original;
    },
    plugins(original, target) {
      if (!("plugins" in target)) {
        return original;
      }
      if (Array.isArray(original)) {
        return original.map((plugin) => createRollupPlugin_default(plugin));
      }
      return createRollupPlugin_default(original);
    }
  });
};
var reduceStrings = (array) => {
  const initial = [];
  return array.reduce((array2, item) => {
    if (typeof item === "string") {
      array2.push(item);
    } else if (Array.isArray(item)) {
      array2 = array2.concat(item);
    } else if (typeof item === "object") {
      array2 = array2.concat(Array.from(Object.values(item)));
    }
    return array2;
  }, initial);
};
var HexoRollupConfigs = class {
  constructor(ctx) {
    this.ctx = ctx;
  }
  site() {
    const raw = getRawSiteConfig("rollup", this.ctx);
    return configFilterProxy(raw, this.ctx.base_dir);
  }
  theme() {
    const raw = getRawThemeConfig("rollup", this.ctx);
    return configFilterProxy(raw, this.ctx.theme_dir);
  }
  overrideTheme() {
    const raw = getRawOverrideThemeConfig("rollup", this.ctx);
    return configFilterProxy(raw, this.ctx.base_dir);
  }
  merged() {
    const site = this.site();
    const theme = this.theme();
    const override = this.overrideTheme();
    const hexo2 = this.ctx;
    const _default = {
      output: {
        format: "esm"
      },
      onwarn(warning) {
        hexo2.log.warn(warning);
      }
    };
    const input = reduceStrings(
      [site, theme, override].filter((config2) => config2 != null && "input" in config2).map((config2) => config2.input)
    );
    return Object.assign(_default, site, theme, override, { input });
  }
};

// src/renderer/rollup/renderer.js
var rollupCache = [];
var rollupRenderAsync = async (config2) => {
  config2.input.cache = rollupCache;
  const bundle = await (0, import_rollup.rollup)(config2.input);
  rollupCache = bundle.cache;
  const { code } = await bundle.generate(config2.output);
  return code;
};
async function renderer(data, _options) {
  const { path: path9, text } = data;
  const hexo2 = this;
  const rollupConfigs = new HexoRollupConfigs(hexo2);
  const config2 = rollupConfigs.merged();
  if (config2.experimentalCodeSplitting) {
    throw new Error('hexo-renderer-rollup not Support "experimentalCodeSplitting".');
  }
  if (!config2.input.includes(path9)) {
    return text;
  }
  config2.input = path9;
  const input = objectWithoutKeys(config2, ["output"]);
  const { output } = config2;
  (0, import_sbg_utility6.writefile)((0, import_path3.join)(hexo2.base_dir, "tmp/config/rollup.json"), (0, import_sbg_utility6.jsonStringifyWithCircularRefs)({ input, output, path: path9 }));
  try {
    return await rollupRenderAsync({ input, output });
  } catch (err) {
    this.log.error(err);
    throw err;
  }
}
var renderer_default2 = renderer;

// src/renderer/rollup/index.ts
function rendererRollup(hexo2) {
  hexo2.extend.renderer.register("js", "js", renderer_default2);
  hexo2.extend.renderer.register("mjs", "js", renderer_default2);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rendererDartSass,
  rendererEjs,
  rendererMarkdownIt,
  rendererNunjucks,
  rendererPug,
  rendererRollup,
  rendererSass,
  rendererStylus
});
