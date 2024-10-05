/* eslint-disable @typescript-eslint/no-require-imports */
'use strict';

import Hexo from 'hexo';
import { StoreFunctionData } from 'hexo/dist/extend/renderer-d';
import MarkdownIt from 'markdown-it';
import path from 'upath';
import { defaultMarkdownOptions } from '../renderer-markdown-it';

export type MarkdownItRendererOptions =
  | string
  | {
      name: string;
      options?: Record<string, any>;
    };

class Renderer {
  parser: MarkdownIt;
  hexo: Hexo;
  disableNunjucks: boolean;

  /**
   * constructor
   *
   * @param hexo context of hexo
   */
  constructor(hexo: Hexo) {
    this.hexo = hexo;

    let { markdown } = hexo.config;

    // Temporary backward compatibility
    if (typeof markdown === 'string') {
      markdown = {
        preset: markdown
      };
      hexo.log.warn(
        `Deprecated config detected. Please use\n\nmarkdown:\n  preset: ${markdown.preset}\n\nSee https://github.com/hexojs/hexo-renderer-markdown-it#options`
      );
    }

    const { preset, render, enable_rules, disable_rules, plugins, anchors, images }: typeof defaultMarkdownOptions =
      markdown;
    this.parser = new MarkdownIt(preset, render);

    if (enable_rules) {
      this.parser.enable(enable_rules);
    }

    if (disable_rules) {
      this.parser.disable(disable_rules);
    }

    if (plugins) {
      this.parser = plugins.reduce((parser: typeof this.parser, pugs: MarkdownItRendererOptions) => {
        if (pugs instanceof Object && pugs.name) {
          const resolved = require.resolve(pugs.name, {
            paths: [
              hexo.base_dir,
              path.join(hexo.base_dir, 'node_modules'),
              path.join(__dirname, '../../'),
              path.join(__dirname, '../../node_modules')
            ]
          });
          return parser.use(require(resolved), pugs.options);
        } else if (typeof pugs === 'string') {
          return parser.use(require(pugs));
        } else {
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
      this.parser.use(require('./anchors'), anchors);
    }

    if (images) {
      this.parser.use(require('./images'), {
        images,
        hexo: this.hexo
      });
    }
    this.disableNunjucks = false;
  }

  render(data: StoreFunctionData, _options: any) {
    this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });
    return this.parser.render(data.text as string, {
      postPath: data.path
    });
  }
}

// module.exports = Renderer;
export default Renderer;
