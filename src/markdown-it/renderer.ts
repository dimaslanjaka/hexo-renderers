'use strict';

import Hexo from 'hexo';
import MarkdownIt from 'markdown-it';

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

    const { preset, render, enable_rules, disable_rules, plugins, anchors, images } = markdown;
    this.parser = new MarkdownIt(preset, render);

    if (enable_rules) {
      this.parser.enable(enable_rules);
    }

    if (disable_rules) {
      this.parser.disable(disable_rules);
    }

    if (plugins) {
      this.parser = plugins.reduce((parser: any, pugs: any) => {
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
        images,
        hexo: this.hexo
      });
    }
    this.disableNunjucks = false;
  }

  render(data: { text: string; path: string; }, options: any) {
    this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });
    return this.parser.render(data.text, {
      postPath: data.path
    });
  }
}

// module.exports = Renderer;
export default Renderer;
