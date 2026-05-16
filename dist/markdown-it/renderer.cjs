'use strict';

var fs = require('fs-extra');
var index = require('../dependencies/markdown-it/lib/index.cjs');
var module$1 = require('module');
var sbgUtility = require('sbg-utility');
var path = require('upath');
var url = require('url');
var anchors = require('./anchors.cjs');
var images = require('./images.cjs');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
const __filename$1 = url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('markdown-it/renderer.cjs', document.baseURI).href)));
const __dirname$1 = path.dirname(__filename$1);
if (typeof require === 'undefined')
    global.require = module$1.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('markdown-it/renderer.cjs', document.baseURI).href)));
class Renderer {
    /**
     * constructor
     *
     * @param hexo context of hexo
     */
    constructor(hexo) {
        this.hexo = hexo;
        this.cacheUnit = new sbgUtility.persistentCache({
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
        const { preset, render, enable_rules, disable_rules, plugins, anchors: anchors$1, images: images$1 } = markdown;
        this.markdownConfig = markdown;
        this.parser = new index.MarkdownIt(preset, render);
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
        if (anchors$1) {
            this.parser.use(anchors, anchors$1);
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
            cacheKey = sbgUtility.normalizePath(data.path).replace(sbgUtility.normalizePath(this.hexo.base_dir), '');
        }
        if (data.text)
            cacheKey += '-' + sbgUtility.md5(data.text);
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

module.exports = Renderer;
