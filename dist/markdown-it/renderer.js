/* eslint-disable @typescript-eslint/no-require-imports */
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHtml = void 0;
var cheerio_1 = require("cheerio");
var markdown_it_1 = __importDefault(require("markdown-it"));
var sbg_utility_1 = require("sbg-utility");
var path = __importStar(require("upath"));
var anchors_1 = __importDefault(require("./anchors"));
var html_tags_1 = require("./html-tags");
var images_1 = __importDefault(require("./images"));
var escapeHtml = function (str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};
exports.escapeHtml = escapeHtml;
var Renderer = /** @class */ (function () {
    /**
     * constructor
     *
     * @param hexo context of hexo
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
        this.parser = new markdown_it_1.default(preset, render);
        if (enable_rules) {
            this.parser.enable(enable_rules);
        }
        if (disable_rules) {
            this.parser.disable(disable_rules);
        }
        if (plugins) {
            this.parser = plugins.reduce(function (parser, pugs) {
                if (pugs instanceof Object && pugs.name) {
                    var resolved = require.resolve(pugs.name, {
                        paths: [
                            hexo.base_dir,
                            path.join(hexo.base_dir, 'node_modules'),
                            path.join(__dirname, '../../'),
                            path.join(__dirname, '../../node_modules')
                        ]
                    });
                    return parser.use(require(resolved), pugs.options);
                }
                else if (typeof pugs === 'string') {
                    return parser.use(require(pugs));
                }
                else {
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
            this.parser.use(anchors_1.default, anchors);
        }
        if (images) {
            this.parser.use(images_1.default, {
                images: images,
                hexo: this.hexo
            });
        }
        this.disableNunjucks = false;
    }
    Renderer.prototype.render = function (data, _options) {
        var _this = this;
        this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });
        var html = this.parser.render(data.text, {
            postPath: data.path
        });
        var $ = (0, cheerio_1.load)(html);
        var regexs = [];
        $('*').each(function (index, element) {
            var tagName = element.tagName.toLowerCase();
            if (!html_tags_1.validHtmlTags.includes(tagName)) {
                var regex = new RegExp('</?' + tagName + '>', 'gm');
                regexs.push(regex);
            }
            else if (tagName === 'img' || tagName === 'source' || tagName === 'iframe') {
                // fix local post asset folder
                var src = $(element).attr('src');
                if (src && !(0, sbg_utility_1.isValidHttpUrl)(src) && !src.startsWith(_this.hexo.config.root)) {
                    var finalSrc = path.join(_this.hexo.config.root, src);
                    _this.hexo.log.info('fix PAF', src, '->', finalSrc);
                    html = html.replace(new RegExp((0, sbg_utility_1.escapeRegex)(src)), finalSrc);
                }
            }
        });
        var results = regexs.map(function (regex) {
            var result = html.match(regex);
            if (typeof hexo != 'undefined') {
                hexo.log.info('found invalid html tags inside anchor', regex, result);
            }
            return { regex: regex, result: result };
        });
        // Flatten the results and filter out null values
        var matches = results.flat();
        for (var i = 0; i < matches.length; i++) {
            var regex_result = matches[i];
            if (regex_result.result) {
                for (var i_1 = 0; i_1 < regex_result.result.length; i_1++) {
                    var replacement = (0, exports.escapeHtml)(regex_result.result[i_1]);
                    // console.log(regex_result.regex, replacement);
                    html = html.replace(regex_result.regex, replacement);
                }
            }
        }
        return html;
    };
    return Renderer;
}());
// module.exports = Renderer;
exports.default = Renderer;
