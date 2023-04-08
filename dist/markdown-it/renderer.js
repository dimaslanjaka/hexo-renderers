'use strict';
var MarkdownIt = require('markdown-it');
var Renderer = /** @class */ (function () {
    /**
     * constructor
     *
     * @param {*} hexo context of hexo
     */
    function Renderer(hexo) {
        this.hexo = hexo;
        var markdown = hexo.config.markdown;
        // Temporary backward compatibility
        if (typeof markdown === 'string') {
            markdown = {
                preset: markdown
            };
            hexo.log.warn("Deprecated config detected. Please use\n\nmarkdown:\n  preset: ".concat(markdown.preset, "\n\nSee https://github.com/hexojs/hexo-renderer-markdown-it#options"));
        }
        var preset = markdown.preset, render = markdown.render, enable_rules = markdown.enable_rules, disable_rules = markdown.disable_rules, plugins = markdown.plugins, anchors = markdown.anchors, images = markdown.images;
        this.parser = new MarkdownIt(preset, render);
        if (enable_rules) {
            this.parser.enable(enable_rules);
        }
        if (disable_rules) {
            this.parser.disable(disable_rules);
        }
        if (plugins) {
            this.parser = plugins.reduce(function (parser, pugs) {
                if (pugs instanceof Object && pugs.name) {
                    return parser.use(require(pugs.name), pugs.options);
                }
                return parser.use(require(pugs));
            }, this.parser);
        }
        if (anchors) {
            this.parser.use(require('./anchors'), anchors);
        }
        if (images) {
            this.parser.use(require('./images'), {
                images: images,
                hexo: this.hexo
            });
        }
        this.disableNunjucks = false;
    }
    Renderer.prototype.render = function (data, options) {
        this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });
        return this.parser.render(data.text, {
            postPath: data.path
        });
    };
    return Renderer;
}());
module.exports = Renderer;
