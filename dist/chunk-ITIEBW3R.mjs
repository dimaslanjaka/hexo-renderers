import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  renderer_default
} from "./chunk-TA4O622L.mjs";

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
function rendererMarkdownIt(hexo) {
  hexo.config.markdown = Object.assign(
    {
      preset: "default",
      render: {},
      anchors: {}
    },
    defaultMarkdownOptions,
    // fallback to empty object when `markdown` options is undefined
    hexo.config.markdown || {}
  );
  hexo.config.markdown.render = Object.assign(
    {
      html: true,
      xhtmlOut: false,
      breaks: true,
      linkify: true,
      typographer: true,
      quotes: "\u201C\u201D\u2018\u2019"
    },
    hexo.config.markdown.render || {}
  );
  hexo.config.markdown.anchors = Object.assign(
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
    hexo.config.markdown.anchors || {}
  );
  const renderer = new renderer_default(hexo);
  if (typeof hexo.config.markdown.disableNunjucks !== "boolean") {
    renderer.disableNunjucks = hexo.config.markdown.disableNunjucks === "true";
  }
  function render(data, options = {}) {
    return renderer.render(data, options);
  }
  hexo.extend.renderer.register("md", "html", render, true);
  hexo.extend.renderer.register("markdown", "html", render, true);
  hexo.extend.renderer.register("mkd", "html", render, true);
  hexo.extend.renderer.register("mkdn", "html", render, true);
  hexo.extend.renderer.register("mdwn", "html", render, true);
  hexo.extend.renderer.register("mdtxt", "html", render, true);
  hexo.extend.renderer.register("mdtext", "html", render, true);
  return render;
}

export {
  defaultMarkdownOptions,
  rendererMarkdownIt
};
