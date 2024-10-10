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

// src/renderer-markdown-it.ts
var renderer_markdown_it_exports = {};
__export(renderer_markdown_it_exports, {
  default: () => rendererMarkdownIt,
  defaultMarkdownOptions: () => defaultMarkdownOptions
});
module.exports = __toCommonJS(renderer_markdown_it_exports);

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/markdown-it/renderer.ts
var import_cheerio = require("cheerio");
var import_markdown_it = __toESM(require("markdown-it"), 1);
var import_module = require("module");
var import_sbg_utility = require("sbg-utility");
var import_upath = __toESM(require("upath"), 1);
var import_url = require("url");

// src/markdown-it/anchors.js
var import_hexo_util = __toESM(require("hexo-util"), 1);
var import_token = __toESM(require("markdown-it/lib/token.mjs"), 1);
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
var validHtmlTags = [
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
var validHtmlTagsRegex = new RegExp("</?(" + validHtmlTags.join("|") + ")(\\s|>)");

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
var require2 = (0, import_module.createRequire)(importMetaUrl);
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
      this.parser.enable(enable_rules);
    }
    if (disable_rules) {
      this.parser.disable(disable_rules);
    }
    if (plugins) {
      this.parser = plugins.reduce((parser, pugs) => {
        if (pugs instanceof Object && pugs.name) {
          const resolved = require2.resolve(pugs.name, {
            paths: [
              hexo2.base_dir,
              import_upath.default.join(hexo2.base_dir, "node_modules"),
              import_upath.default.join(__dirname, "../../"),
              import_upath.default.join(__dirname, "../../node_modules")
            ]
          });
          return parser.use(require2(resolved), pugs.options);
        } else if (typeof pugs === "string") {
          return parser.use(require2(pugs));
        } else {
          return parser.use(require2(require2.resolve(pugs.name)), pugs.options);
        }
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
      if (!validHtmlTags.includes(tagName)) {
        const regex = new RegExp("</?" + tagName + ">", "gm");
        regexs.push(regex);
      } else if (tagName === "img" || tagName === "source" || tagName === "iframe") {
        const src = $(element).attr("src");
        if (src && !(0, import_sbg_utility.isValidHttpUrl)(src) && !src.startsWith(this.hexo.config.root)) {
          const finalSrc = import_upath.default.join(this.hexo.config.root, src);
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
  const renderer = new renderer_default(hexo2);
  if (typeof hexo2.config.markdown.disableNunjucks !== "boolean") {
    renderer.disableNunjucks = hexo2.config.markdown.disableNunjucks === "true";
  }
  function render(data, options = {}) {
    return renderer.render(data, options);
  }
  hexo2.extend.renderer.register("md", "html", render, true);
  hexo2.extend.renderer.register("markdown", "html", render, true);
  hexo2.extend.renderer.register("mkd", "html", render, true);
  hexo2.extend.renderer.register("mkdn", "html", render, true);
  hexo2.extend.renderer.register("mdwn", "html", render, true);
  hexo2.extend.renderer.register("mdtxt", "html", render, true);
  hexo2.extend.renderer.register("mdtext", "html", render, true);
  return render;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultMarkdownOptions
});
