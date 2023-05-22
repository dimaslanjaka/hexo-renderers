/* global hexo */
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = __importDefault(require("./markdown-it/renderer"));
/**
 * hexo-renderer-markdown-it
 * @param hexo
 */
function rendererMarkdownIt(hexo) {
    hexo.config.markdown = Object.assign({
        preset: 'default',
        render: {},
        anchors: {}
    }, hexo.config.markdown);
    hexo.config.markdown.render = Object.assign({
        html: true,
        xhtmlOut: false,
        breaks: true,
        linkify: true,
        typographer: true,
        quotes: '“”‘’'
    }, hexo.config.markdown.render);
    hexo.config.markdown.anchors = Object.assign({
        level: 2,
        collisionSuffix: '',
        permalink: false,
        permalinkClass: 'header-anchor',
        permalinkSide: 'left',
        permalinkSymbol: '¶',
        case: 0,
        separator: '-'
    }, hexo.config.markdown.anchors);
    var renderer = new renderer_1.default(hexo);
    if (typeof hexo.config.markdown.disableNunjucks !== 'boolean') {
        renderer.disableNunjucks = hexo.config.markdown.disableNunjucks === 'true';
    }
    function render(data, options) {
        return renderer.render(data, options);
    }
    hexo.extend.renderer.register('md', 'html', render, true);
    hexo.extend.renderer.register('markdown', 'html', render, true);
    hexo.extend.renderer.register('mkd', 'html', render, true);
    hexo.extend.renderer.register('mkdn', 'html', render, true);
    hexo.extend.renderer.register('mdwn', 'html', render, true);
    hexo.extend.renderer.register('mdtxt', 'html', render, true);
    hexo.extend.renderer.register('mdtext', 'html', render, true);
}
exports.default = rendererMarkdownIt;
