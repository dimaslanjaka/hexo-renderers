'use strict';

import hutil from 'hexo-util';
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/token';

interface renderPermalinkOptions {
  [key: string]: any;
  permalinkClass: any;
  permalinkSymbol: any;
  permalinkSide: string;
  case: any;
  level: number;
  collisionSuffix: string;
  permalink: any;
}

const renderPermalink = function (
  slug: string,
  opts: renderPermalinkOptions,
  tokens: { [x: string]: { children: Token[] } },
  idx: number
) {
  const permalink = [
    Object.assign(new Token('link_open', 'a', 1), {
      attrs: [
        ['class', opts.permalinkClass],
        ['href', '#' + slug]
      ]
    }),
    Object.assign(new Token('text', '', 0), {
      content: opts.permalinkSymbol
    }),
    new Token('link_close', 'a', -1),
    Object.assign(new Token('text', '', 0), {
      content: ''
    })
  ];

  if (opts.permalinkSide === 'right') {
    return tokens[idx + 1].children.push(...permalink);
  }

  return tokens[idx + 1].children.unshift(...permalink);
};

const anchor = function (md: MarkdownIt, opts: { renderPermalink: typeof renderPermalink } & renderPermalinkOptions) {
  opts = Object.assign(opts, { renderPermalink });

  let titleStore = {};
  const originalHeadingOpen = md.renderer.rules.heading_open;
  const slugOpts = { transform: opts.case, ...opts };

  md.renderer.rules.heading_open = function (...args) {
    const [tokens, idx, _something, _somethingelse, self] = args;

    if (tokens[idx].tag.substr(1) >= opts.level) {
      let _tokens$idx;

      const title = tokens[idx + 1].children.reduce((acc, t) => {
        return acc + t.content;
      }, '');

      let slug = hutil.slugize(title, slugOpts);

      if (Object.prototype.hasOwnProperty.call(titleStore, slug)) {
        titleStore[slug] = titleStore[slug] + 1;
        slug = slug + '-' + opts.collisionSuffix + titleStore[slug].toString();
      } else {
        titleStore[slug] = 1;
      }

      ((_tokens$idx = tokens[idx]), !_tokens$idx.attrs && (_tokens$idx.attrs = []), _tokens$idx.attrs).push([
        'id',
        slug
      ]);

      if (opts.permalink) {
        // opts.renderPermalink.apply(opts, [slug, opts].concat(args));
        opts.renderPermalink(slug, opts, tokens, idx);
      }
    }

    // return originalHeadingOpen ? originalHeadingOpen.apply(this, args) : self.renderToken.apply(self, args);
    return originalHeadingOpen ? originalHeadingOpen(...args) : self.renderToken(...args);
  };

  md.core.ruler.push('clear_anchor_title_store', () => {
    titleStore = {};
  });
};

export default anchor;
