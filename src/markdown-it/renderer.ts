'use strict';

import { load } from 'cheerio';
import fs from 'fs-extra';
import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import MarkdownIt from 'markdown-it';
import { createRequire } from 'module';
import { escapeRegex, isValidHttpUrl, md5, md5FileSync, persistentCache } from 'sbg-utility';
import path from 'upath';
import { fileURLToPath } from 'url';
import { defaultMarkdownOptions } from '../renderer-markdown-it.js';
import anchorProcess from './anchors.js';
import { resolveValidHtmlTags } from './html-tags.js';
import imageProcess from './images.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (typeof require === 'undefined') global.require = createRequire(import.meta.url);
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
  cacheUnit: persistentCache;

  /**
   * constructor
   *
   * @param hexo context of hexo
   */
  constructor(hexo: Hexo) {
    this.hexo = hexo;
    this.cacheUnit = new persistentCache({
      base: path.join(this.hexo.base_dir, 'tmp/hexo-renderers'),
      name: 'markdown-it-renderer',
      persist: true,
      memory: false
    });

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
      this.parser.enable(enable_rules, false);
    }

    if (disable_rules) {
      this.parser.disable(disable_rules, false);
    }

    if (plugins) {
      const node_modules_paths = [
        hexo.base_dir,
        path.join(hexo.base_dir, 'node_modules'),
        path.join(process.cwd(), 'node_modules'),
        // when installed inside node_modules
        path.join(__dirname, '../../'),
        path.join(__dirname, '../../node_modules'),
        path.join(__dirname, '../../../node_modules')
      ].filter(fs.existsSync);
      this.parser = plugins.reduce((parser: typeof this.parser, mdOpt: MarkdownItRendererOptions) => {
        let pluginName = '';
        const pluginOptions = mdOpt && typeof mdOpt === 'object' && 'options' in mdOpt ? mdOpt.options : {};
        if (mdOpt instanceof Object && mdOpt.name) {
          pluginName = mdOpt.name;
        } else if (typeof mdOpt === 'string') {
          pluginName = mdOpt;
        } else if (pluginName === '') {
          hexo.log.error(`markdown-it plugin failed load ${mdOpt}`);
          return parser;
        }

        if (pluginName === '@renbaoshuo/markdown-it-katex') pluginName = 'markdown-it-mathematics';
        else if (pluginName === 'markdown-it-katex') pluginName = 'markdown-it-mathematics';

        try {
          const resolved = require.resolve(pluginName, {
            paths: node_modules_paths
          });
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const r = require(resolved);
          if (typeof r !== 'function') {
            hexo.log.error(`markdown-it plugin ${pluginName} is not a function`);
          } else {
            return parser.use(r, pluginOptions);
          }
        } catch (error) {
          hexo.log.error(`markdown-it plugin failed load ${mdOpt}`, error);
        }

        // return default parser
        return parser;
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

  async render(data: StoreFunctionData, _options: Record<string, any>) {
    const cacheKey = (md5FileSync(data.path as string) || md5(data.text as string))!;
    const cacheValue = await this.cacheUnit.get(cacheKey, '');
    if (cacheValue !== '') return cacheValue;

    this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });
    let html = this.parser.render(data.text as string, {
      postPath: data.path
    });
    const $ = load(html);
    const regexs: RegExp[] = [];
    $('*').each((index, element) => {
      const tagName = (element as any).tagName.toLowerCase();
      if (!resolveValidHtmlTags.bind(hexo)().includes(tagName)) {
        const regex = new RegExp('</?' + tagName + '>', 'gm');
        regexs.push(regex);
      } else if (tagName === 'img' || tagName === 'source' || tagName === 'iframe') {
        // fix local post asset folder
        const src = $(element).attr('src');
        if (src && !isValidHttpUrl(src) && !src.startsWith(this.hexo.config.root) && !src.startsWith('//')) {
          const finalSrc = path.join(this.hexo.config.root, src);
          this.hexo.log.info('fix PAF', src, '->', finalSrc);
          const escaped = escapeRegex(src) as string;
          html = html.replace(new RegExp(escaped), finalSrc);
        }
      }
    });
    const results = regexs.map((regex) => {
      const result = html.match(regex);
      if (typeof hexo != 'undefined') {
        hexo.log.warn('found invalid html tags inside anchor', regex, result);
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
    this.cacheUnit.set(cacheKey, html);
    return html;
  }
}

// module.exports = Renderer;
export default Renderer;
