import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  anchors_default
} from "./chunk-S7LPH4ML.mjs";
import {
  validHtmlTags
} from "./chunk-2LIOBH7F.mjs";
import {
  images_default
} from "./chunk-663ODQJ6.mjs";

// src/markdown-it/renderer.ts
import { load } from "cheerio";
import MarkdownIt from "markdown-it";
import { createRequire } from "module";
import { escapeRegex, isValidHttpUrl } from "sbg-utility";
import path from "upath";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var require2 = createRequire(import.meta.url);
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
          const resolved = require2.resolve(pugs.name, {
            paths: [
              hexo2.base_dir,
              path.join(hexo2.base_dir, "node_modules"),
              path.join(__dirname, "../../"),
              path.join(__dirname, "../../node_modules")
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
    if (images) {
      this.parser.use(images_default, {
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
      if (!validHtmlTags.includes(tagName)) {
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
