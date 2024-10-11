import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  anchors_default
} from "./chunk-7V7MW3PG.mjs";
import {
  resolveValidHtmlTags
} from "./chunk-TUQNRFPA.mjs";
import {
  images_default
} from "./chunk-663ODQJ6.mjs";
import {
  __require
} from "./chunk-LPG7NA4D.mjs";

// src/markdown-it/renderer.ts
import { load } from "cheerio";
import fs from "fs-extra";
import MarkdownIt from "markdown-it";
import { createRequire } from "module";
import { escapeRegex, isValidHttpUrl } from "sbg-utility";
import path from "upath";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
if (typeof __require === "undefined") global.require = createRequire(import.meta.url);
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
      this.parser.enable(enable_rules, false);
    }
    if (disable_rules) {
      this.parser.disable(disable_rules, false);
    }
    if (plugins) {
      const node_modules_paths = [
        hexo2.base_dir,
        path.join(hexo2.base_dir, "node_modules"),
        path.join(process.cwd(), "node_modules"),
        // when installed inside node_modules
        path.join(__dirname, "../../"),
        path.join(__dirname, "../../node_modules"),
        path.join(__dirname, "../../../node_modules")
      ].filter(fs.existsSync);
      this.parser = plugins.reduce((parser, mdOpt) => {
        if (mdOpt instanceof Object && mdOpt.name) {
          const resolved = __require.resolve(mdOpt.name, {
            paths: node_modules_paths
          });
          const r = __require(resolved);
          if (typeof r === "function") return parser.use(r, mdOpt.options || {});
          hexo2.log.error(`markdown-it plugin ${mdOpt.name} is not a function`);
        } else if (typeof mdOpt === "string") {
          const resolved = __require.resolve(mdOpt, {
            paths: node_modules_paths
          });
          const r = __require(resolved);
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
      if (!resolveValidHtmlTags().includes(tagName)) {
        const regex = new RegExp("</?" + tagName + ">", "gm");
        regexs.push(regex);
      } else if (tagName === "img" || tagName === "source" || tagName === "iframe") {
        const src = $(element).attr("src");
        if (src && !isValidHttpUrl(src) && !src.startsWith(this.hexo.config.root) && !src.startsWith("//")) {
          const finalSrc = path.join(this.hexo.config.root, src);
          this.hexo.log.info("fix PAF", src, "->", finalSrc);
          html = html.replace(new RegExp(escapeRegex(src)), finalSrc);
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

export {
  escapeHtml,
  renderer_default
};
