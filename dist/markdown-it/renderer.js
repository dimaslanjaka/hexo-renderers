'use strict';
import { load } from 'cheerio';
import fs from 'fs-extra';
import MarkdownIt from 'markdown-it';
import { createRequire } from 'module';
import { escapeRegex, isValidHttpUrl } from 'sbg-utility';
import path from 'upath';
import { fileURLToPath } from 'url';
import anchorProcess from './anchors.js';
import { resolveValidHtmlTags } from './html-tags.js';
import imageProcess from './images.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (typeof require === 'undefined')
    global.require = createRequire(import.meta.url);
export const escapeHtml = (str) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};
class Renderer {
    /**
     * constructor
     *
     * @param hexo context of hexo
     */
    constructor(hexo) {
        this.hexo = hexo;
        let { markdown } = hexo.config;
        // Temporary backward compatibility
        if (typeof markdown === 'string') {
            markdown = {
                preset: markdown
            };
            hexo.log.warn(`Deprecated config detected. Please use\n\nmarkdown:\n  preset: ${markdown.preset}\n\nSee https://github.com/hexojs/hexo-renderer-markdown-it#options`);
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
                hexo.base_dir,
                path.join(hexo.base_dir, 'node_modules'),
                path.join(process.cwd(), 'node_modules'),
                // when installed inside node_modules
                path.join(__dirname, '../../'),
                path.join(__dirname, '../../node_modules'),
                path.join(__dirname, '../../../node_modules')
            ].filter(fs.existsSync);
            this.parser = plugins.reduce((parser, mdOpt) => {
                if (mdOpt instanceof Object && mdOpt.name) {
                    const resolved = require.resolve(mdOpt.name, {
                        paths: node_modules_paths
                    });
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    const r = require(resolved);
                    if (typeof r === 'function')
                        return parser.use(r, mdOpt.options || {});
                    hexo.log.error(`markdown-it plugin ${mdOpt.name} is not a function`);
                }
                else if (typeof mdOpt === 'string') {
                    const resolved = require.resolve(mdOpt, {
                        paths: node_modules_paths
                    });
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    const r = require(resolved);
                    if (typeof r === 'function')
                        return parser.use(r);
                    hexo.log.error(`markdown-it plugin ${mdOpt} is not a function`);
                }
                else {
                    hexo.log.error(`markdown-it plugin failed load ${mdOpt}`);
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
    render(data, _options) {
        this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });
        let html = this.parser.render(data.text, {
            postPath: data.path
        });
        const $ = load(html);
        const regexs = [];
        $('*').each((index, element) => {
            const tagName = element.tagName.toLowerCase();
            if (!resolveValidHtmlTags().includes(tagName)) {
                const regex = new RegExp('</?' + tagName + '>', 'gm');
                regexs.push(regex);
            }
            else if (tagName === 'img' || tagName === 'source' || tagName === 'iframe') {
                // fix local post asset folder
                const src = $(element).attr('src');
                if (src && !isValidHttpUrl(src) && !src.startsWith(this.hexo.config.root) && !src.startsWith('//')) {
                    const finalSrc = path.join(this.hexo.config.root, src);
                    this.hexo.log.info('fix PAF', src, '->', finalSrc);
                    html = html.replace(new RegExp(escapeRegex(src)), finalSrc);
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
        return html;
    }
}
// module.exports = Renderer;
export default Renderer;
