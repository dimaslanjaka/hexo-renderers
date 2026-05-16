'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createDOMPurify = require('dompurify');
var jsdom = require('jsdom');
var marked_esm = require('../dependencies/marked/lib/marked.esm.cjs');
var path = require('upath');
var markedRenderer = require('./marked-renderer.cjs');
var markedTokenizer = require('./marked-tokenizer.cjs');

function rendererMarkedNew(data, options) {
    const { post_asset_folder, marked: markedCfg, source_dir } = this.config;
    const { prependRoot, postAsset, dompurify } = markedCfg;
    const { path: path$1, text } = data;
    const renderer = new markedRenderer.MarkedRenderer(options);
    const tokenizer = new markedTokenizer.MarkedTokenizer(options);
    // exec filter to extend marked
    this.execFilterSync('marked:use', marked_esm.use, { context: this });
    // exec filter to extend renderer.
    this.execFilterSync('marked:renderer', renderer, { context: this });
    // exec filter to extend tokenizer
    this.execFilterSync('marked:tokenizer', tokenizer, { context: this });
    const extensions = [];
    this.execFilterSync('marked:extensions', extensions, { context: this });
    marked_esm.use({ extensions });
    let postPath = '';
    if (path$1 && post_asset_folder && prependRoot && postAsset) {
        const Post = this.model('Post');
        // Windows compatibility, Post.findOne() requires forward slash
        const source = path$1.substring(this.source_dir.length).replace(/\\/g, '/');
        const post = Post.findOne({ source });
        if (post) {
            const { source: postSource } = post;
            postPath = path.join(source_dir, path.dirname(postSource), path.basename(postSource, path.extname(postSource)));
        }
    }
    let sanitizer = function (html) {
        return html;
    };
    if (dompurify) {
        const window = new jsdom.JSDOM('').window;
        const DOMPurify = createDOMPurify(window);
        let param = {};
        if (dompurify !== true) {
            param = dompurify;
        }
        sanitizer = function (html) {
            return DOMPurify.sanitize(html, param);
        };
    }
    marked_esm.use({
        renderer,
        tokenizer
    });
    return sanitizer(marked_esm.parse(text, Object.assign({
        // headerIds was removed in marked v8.0.0, but we still need it
        headerIds: true
    }, markedCfg, options, { postPath, hexo: this, _headingId: {} })));
}

exports.default = rendererMarkedNew;
exports.rendererMarkedNew = rendererMarkedNew;
