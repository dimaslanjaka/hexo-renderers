'use strict';

import Hexo from 'hexo';
import type { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import Renderer from './markdown-it/renderer.js';

export const defaultMarkdownOptions = {
  preset: 'default',
  render: {
    html: true,
    xhtmlOut: false,
    langPrefix: 'language-',
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: '“”‘’'
  },
  enable_rules: null,
  disable_rules: null,
  plugins: [
    'markdown-it-abbr',
    'markdown-it-attrs',
    'markdown-it-bracketed-spans',
    'markdown-it-sup',
    'markdown-it-cjk-breaks',
    'markdown-it-sub',
    'markdown-it-deflist',
    'markdown-it-footnote',
    'markdown-it-ins',
    'markdown-it-mark',
    {
      name: 'markdown-it-emoji',
      options: {
        shortcuts: {
          laughing: ':D'
        }
      } as Record<string, any>
    }
  ],
  anchors: {
    level: 2,
    collisionSuffix: '',
    permalink: false,
    permalinkClass: 'header-anchor',
    permalinkSide: 'left',
    permalinkSymbol: '¶',
    case: 0,
    separator: '-'
  },
  images: {
    lazyload: false,
    prepend_root: false,
    post_asset: false
  }
};

export type rendererMarkdownItReturn = (
  data: StoreFunctionData & Record<string, any>,
  options?: Record<string, any>
) => string;

/**
 * hexo-renderer-markdown-it
 * @param hexo
 */
export function rendererMarkdownIt(hexo: Hexo): rendererMarkdownItReturn {
  hexo.config.markdown = Object.assign(
    {
      preset: 'default',
      render: {},
      anchors: {}
    },
    defaultMarkdownOptions,
    // fallback to empty object when `markdown` options is undefined
    hexo.config.markdown || {}
  );

  hexo.config.markdown.render = Object.assign(
    {
      html: true,
      xhtmlOut: false,
      breaks: true,
      linkify: true,
      typographer: true,
      quotes: '“”‘’'
    },
    hexo.config.markdown.render || {}
  );

  hexo.config.markdown.anchors = Object.assign(
    {
      level: 2,
      collisionSuffix: '',
      permalink: false,
      permalinkClass: 'header-anchor',
      permalinkSide: 'left',
      permalinkSymbol: '¶',
      case: 0,
      separator: '-'
    },
    hexo.config.markdown.anchors || {}
  );

  const renderer = new Renderer(hexo);

  renderer.disableNunjucks =
    hexo.config.markdown.disableNunjucks === 'true' || hexo.config.markdown.disableNunjucks === true;

  function render(data: StoreFunctionData, options: Record<string, any> = {}) {
    return renderer.render(data, options);
  }

  hexo.extend.renderer.register('md', 'html', render, true);
  hexo.extend.renderer.register('markdown', 'html', render, true);
  hexo.extend.renderer.register('mkd', 'html', render, true);
  hexo.extend.renderer.register('mkdn', 'html', render, true);
  hexo.extend.renderer.register('mdwn', 'html', render, true);
  hexo.extend.renderer.register('mdtxt', 'html', render, true);
  hexo.extend.renderer.register('mdtext', 'html', render, true);

  return render;
}
