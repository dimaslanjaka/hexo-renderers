'use strict';

import { load } from 'cheerio';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import MarkdownIt from 'markdown-it';
import { createRequire } from 'module';
import { escapeRegex, isValidHttpUrl } from 'sbg-utility';
import path from 'upath';
import { fileURLToPath } from 'url';
import { defaultMarkdownOptions } from '../renderer-markdown-it.js';
import anchorProcess from './anchors.js';
import { validHtmlTags } from './html-tags.js';
import imageProcess from './images.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
export const escapeHtml = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export type MarkdownItRendererOptions =
  | string
  | {
      name: string;
      options?: Record<string, any>;
    };

class Renderer {
  parser: MarkdownIt;
  hexo: Hexo;
  disableNunjucks: boolean;

  /**
   * constructor
   *
   * @param hexo context of hexo
   */
  constructor(hexo: Hexo) {
    this.hexo = hexo;

    let { markdown } = hexo.config;

    // Temporary backward compatibility
    if (typeof markdown === 'string') {
      markdown = {
        preset: markdown
      };
      hexo.log.warn(
        `Deprecated config detected. Please use\n\nmarkdown:\n  preset: ${markdown.preset}\n\nSee https://github.com/hexojs/hexo-renderer-markdown-it#options`
      );
    }

    const { preset, render, enable_rules, disable_rules, plugins, anchors, images }: typeof defaultMarkdownOptions =
      markdown;
    this.parser = new MarkdownIt(preset, render);

    if (enable_rules) {
      this.parser.enable(enable_rules);
    }

    if (disable_rules) {
      this.parser.disable(disable_rules);
    }

    if (plugins) {
      this.parser = plugins.reduce((parser: typeof this.parser, pugs: MarkdownItRendererOptions) => {
        if (pugs instanceof Object && pugs.name) {
          const resolved = require.resolve(pugs.name, {
            paths: [
              hexo.base_dir,
              path.join(hexo.base_dir, 'node_modules'),
              path.join(__dirname, '../../'),
              path.join(__dirname, '../../node_modules')
            ]
          });
          return parser.use(require(resolved), pugs.options);
        } else if (typeof pugs === 'string') {
          return parser.use(require(pugs));
        } else {
          return parser.use(require(require.resolve(pugs.name)), pugs.options);
        }

        /*else {
          if (isModuleInstalled(pugs.name)) {
            return parser.use(require(pugs.name), pugs.options);
          } else {
            try {
              hexo.log.e(pugs.name, 'not installed', { resolve: require.resolve(pugs.name) });
              return parser.use(require(require.resolve(pugs.name)), pugs.options);
            } catch (e) {
              console.log(require.resolve(pugs.name));
            }
          }
        }*/
      }, this.parser);
    }

    if (anchors) {
      this.parser.use(anchorProcess, anchors);
    }

    if (images) {
      this.parser.use(imageProcess, {
        images,
        hexo: this.hexo
      });
    }
    this.disableNunjucks = false;
  }

  render(data: StoreFunctionData, _options: any) {
    this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });
    let html = this.parser.render(data.text as string, {
      postPath: data.path
    });
    const $ = load(html);
    const regexs: RegExp[] = [];
    $('*').each((index, element) => {
      const tagName = (element as any).tagName.toLowerCase();
      if (!validHtmlTags.includes(tagName)) {
        const regex = new RegExp('</?' + tagName + '>', 'gm');
        regexs.push(regex);
      } else if (tagName === 'img' || tagName === 'source' || tagName === 'iframe') {
        // fix local post asset folder
        const src = $(element).attr('src');
        if (src && !isValidHttpUrl(src) && !src.startsWith(this.hexo.config.root)) {
          const finalSrc = path.join(this.hexo.config.root, src);
          this.hexo.log.info('fix PAF', src, '->', finalSrc);
          html = html.replace(new RegExp(escapeRegex(src)), finalSrc);
        }
      }
    });
    const results = regexs.map((regex) => {
      const result = html.match(regex);
      if (typeof hexo != 'undefined') {
        hexo.log.info('found invalid html tags inside anchor', regex, result);
      }
      return { regex, result };
    });
    // Flatten the results and filter out null values
    const matches = results.flat();
    for (let i = 0; i < matches.length; i++) {
      const regex_result = matches[i];
      if (regex_result.result) {
        for (let i = 0; i < regex_result.result.length; i++) {
          const replacement = escapeHtml(regex_result.result[i]);
          // console.log(regex_result.regex, replacement);
          html = html.replace(regex_result.regex, replacement);
        }
      }
    }
    return html;
  }
}

// module.exports = Renderer;
export default Renderer;
