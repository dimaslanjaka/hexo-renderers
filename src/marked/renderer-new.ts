import createDOMPurify from 'dompurify';
import Hexo from 'hexo';
import { JSDOM } from 'jsdom';
import * as marked from 'marked';
import upath from 'upath';
import { HexoLocalsData } from '../helper/hexoLocalsData';
import { MarkedRenderer } from './marked-renderer';
import { MarkedTokenizer } from './marked-tokenizer';

export function rendererMarkedNew(this: Hexo, data: Partial<HexoLocalsData>, options: marked.MarkedOptions) {
  const { post_asset_folder, marked: markedCfg, source_dir } = this.config;
  const { prependRoot, postAsset, dompurify } = markedCfg;
  const { path, text } = data;
  const renderer = new MarkedRenderer(options);
  const tokenizer = new MarkedTokenizer(options);

  // exec filter to extend marked
  this.execFilterSync('marked:use', marked.use, { context: this });

  // exec filter to extend renderer.
  this.execFilterSync('marked:renderer', renderer, { context: this });

  // exec filter to extend tokenizer
  this.execFilterSync('marked:tokenizer', tokenizer, { context: this });

  const extensions = [];
  this.execFilterSync('marked:extensions', extensions, { context: this });
  marked.use({ extensions });

  let postPath = '';
  if (path && post_asset_folder && prependRoot && postAsset) {
    const Post = this.model('Post');
    // Windows compatibility, Post.findOne() requires forward slash
    const source = path.substring(this.source_dir.length).replace(/\\/g, '/');
    const post = Post.findOne({ source });
    if (post) {
      const { source: postSource } = post;
      postPath = upath.join(
        source_dir,
        upath.dirname(postSource),
        upath.basename(postSource, upath.extname(postSource))
      );
    }
  }

  let sanitizer = function (html: string) {
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

  marked.use({
    renderer,
    tokenizer
  });

  return sanitizer(
    marked.parse(
      text,
      Object.assign(
        {
          // headerIds was removed in marked v8.0.0, but we still need it
          headerIds: true
        },
        markedCfg,
        options,
        { postPath, hexo: this, _headingId: {} }
      )
    ) as any
  );
}

export default rendererMarkedNew;
