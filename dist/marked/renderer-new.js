import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { use as Nt, parse as Qt } from '../dependencies/marked/lib/marked.esm.js';
import path from 'upath';
import { MarkedRenderer } from './marked-renderer.js';
import { MarkedTokenizer } from './marked-tokenizer.js';

function rendererMarkedNew(data, options) {
    const { post_asset_folder, marked: markedCfg, source_dir } = this.config;
    const { prependRoot, postAsset, dompurify } = markedCfg;
    const { path: path$1, text } = data;
    const renderer = new MarkedRenderer(options);
    const tokenizer = new MarkedTokenizer(options);
    // exec filter to extend marked
    this.execFilterSync('marked:use', Nt, { context: this });
    // exec filter to extend renderer.
    this.execFilterSync('marked:renderer', renderer, { context: this });
    // exec filter to extend tokenizer
    this.execFilterSync('marked:tokenizer', tokenizer, { context: this });
    const extensions = [];
    this.execFilterSync('marked:extensions', extensions, { context: this });
    Nt({ extensions });
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
        const window = new JSDOM('').window;
        const DOMPurify = createDOMPurify(window);
        let param = {};
        if (dompurify !== true) {
            param = dompurify;
        }
        sanitizer = function (html) {
            return DOMPurify.sanitize(html, param);
        };
    }
    Nt({
        renderer,
        tokenizer
    });
    return sanitizer(Qt(text, Object.assign({
        // headerIds was removed in marked v8.0.0, but we still need it
        headerIds: true
    }, markedCfg, options, { postPath, hexo: this, _headingId: {} })));
}

export { rendererMarkedNew as default, rendererMarkedNew };
