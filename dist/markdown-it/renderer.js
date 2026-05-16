import fs from 'fs-extra';
import { MarkdownIt } from '../dependencies/markdown-it/lib/index.js';
import { createRequire } from 'module';
import { persistentCache, normalizePath, md5 } from 'sbg-utility';
import path from 'upath';
import { fileURLToPath } from 'url';
import anchor from './anchors.js';
import images from './images.js';

const __filename$1 = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename$1);
if (typeof require === 'undefined')
    global.require = createRequire(import.meta.url);
class Renderer {
    /**
     * constructor
     *
     * @param hexo context of hexo
     */
    constructor(hexo) {
        this.hexo = hexo;
        this.cacheUnit = new persistentCache({
            base: path.join(hexo.base_dir, 'tmp/hexo-renderers'),
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
            hexo.log.warn(`Deprecated config detected. Please use\n\nmarkdown:\n  preset: ${markdown.preset}\n\nSee https://github.com/hexojs/hexo-renderer-markdown-it#options`);
        }
        const { preset, render, enable_rules, disable_rules, plugins, anchors, images: images$1 } = markdown;
        this.markdownConfig = markdown;
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
                path.join(__dirname$1, '../../'),
                path.join(__dirname$1, '../../node_modules'),
                path.join(__dirname$1, '../../../node_modules')
            ].filter(fs.existsSync);
            this.parser = plugins.reduce((parser, mdOpt) => {
                let pluginName = '';
                const pluginOptions = mdOpt && typeof mdOpt === 'object' && 'options' in mdOpt ? mdOpt.options : {};
                if (mdOpt instanceof Object && mdOpt.name) {
                    pluginName = mdOpt.name;
                }
                else if (typeof mdOpt === 'string') {
                    pluginName = mdOpt;
                }
                else if (pluginName === '') {
                    hexo.log.error(`markdown-it plugin failed load ${mdOpt}`);
                    return parser;
                }
                if (pluginName === '@renbaoshuo/markdown-it-katex')
                    pluginName = 'markdown-it-mathematics';
                else if (pluginName === 'markdown-it-katex')
                    pluginName = 'markdown-it-mathematics';
                try {
                    const resolved = require.resolve(pluginName, {
                        paths: node_modules_paths
                    });
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    const r = require(resolved);
                    if (typeof r !== 'function') {
                        hexo.log.error(`markdown-it plugin ${pluginName} is not a function`);
                    }
                    else {
                        return parser.use(r, pluginOptions);
                    }
                }
                catch (error) {
                    hexo.log.error(`markdown-it plugin failed load ${mdOpt}`, error);
                }
                // return default parser
                return parser;
            }, this.parser);
        }
        if (anchors) {
            this.parser.use(anchor, anchors);
        }
        if (images$1) {
            this.parser.use(images, {
                images: images$1,
                hexo: this.hexo
            });
        }
        this.disableNunjucks = false;
    }
    render(data, options) {
        const cache = this.markdownConfig.render.cache || false;
        let cacheKey = '';
        if (data.path) {
            cacheKey = normalizePath(data.path).replace(normalizePath(this.hexo.base_dir), '');
        }
        if (data.text)
            cacheKey += '-' + md5(data.text);
        if (cache) {
            const cacheValue = this.cacheUnit.getSync(cacheKey, '');
            if (cacheValue !== '')
                return cacheValue;
        }
        this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });
        let html;
        if (options != null && options.inline === true) {
            html = this.parser.renderInline(data.text, {
                postPath: data.path
            });
        }
        else {
            html = this.parser.render(data.text, {
                postPath: data.path
            });
        }
        this.cacheUnit.setSync(cacheKey, html);
        return html;
    }
}

export { Renderer as default };
