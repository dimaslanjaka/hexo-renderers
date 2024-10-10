import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  require_anchors
} from "./chunk-M4SIDFMO.mjs";
import {
  require_html_tags
} from "./chunk-CMWOOF5X.mjs";
import {
  require_images
} from "./chunk-U354XDU5.mjs";
import {
  __require,
  __toESM
} from "./chunk-QAIXVEL3.mjs";

// src/markdown-it/renderer.ts
var import_anchors = __toESM(require_anchors());
var import_html_tags = __toESM(require_html_tags());
var import_images = __toESM(require_images());
import { load } from "cheerio";
import MarkdownIt from "markdown-it";
import { escapeRegex, isValidHttpUrl } from "sbg-utility";
import * as path from "upath";
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
    this.parser = new MarkdownIt(preset, render);
    if (enable_rules) {
      this.parser.enable(enable_rules);
    }
    if (disable_rules) {
      this.parser.disable(disable_rules);
    }
    if (plugins) {
      this.parser = plugins.reduce((parser, pugs) => {
        if (pugs instanceof Object && pugs.name) {
          const resolved = __require.resolve(pugs.name, {
            paths: [
              hexo2.base_dir,
              path.join(hexo2.base_dir, "node_modules"),
              path.join(__dirname, "../../"),
              path.join(__dirname, "../../node_modules")
            ]
          });
          return parser.use(__require(resolved), pugs.options);
        } else if (typeof pugs === "string") {
          return parser.use(__require(pugs));
        } else {
          return parser.use(__require(__require.resolve(pugs.name)), pugs.options);
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
    const $ = load(html);
    const regexs = [];
    $("*").each((index, element) => {
      const tagName = element.tagName.toLowerCase();
      if (!import_html_tags.validHtmlTags.includes(tagName)) {
        const regex = new RegExp("</?" + tagName + ">", "gm");
        regexs.push(regex);
      } else if (tagName === "img" || tagName === "source" || tagName === "iframe") {
        const src = $(element).attr("src");
        if (src && !isValidHttpUrl(src) && !src.startsWith(this.hexo.config.root)) {
          const finalSrc = path.join(this.hexo.config.root, src);
          this.hexo.log.info("fix PAF", src, "->", finalSrc);
          html = html.replace(new RegExp(escapeRegex(src)), finalSrc);
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

export {
  escapeHtml,
  renderer_default
};
