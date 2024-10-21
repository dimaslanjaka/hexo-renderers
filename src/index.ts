import { del } from 'sbg-utility';
import path from 'upath';
import getRendererConfig from './config.js';
import { registerCustomGenerator } from './generator/index.js';
import { registerCustomHelper } from './helper/index.js';
import { logname } from './helper/util.js';
import { rendererDartSass } from './renderer-dartsass.js';
import { rendererEjs } from './renderer-ejs.js';
import { rendererMarkdownIt } from './renderer-markdown-it.js';
import { rendererNunjucks } from './renderer-nunjucks.js';
import { rendererPug } from './renderer-pug.js';
import { rendererSass } from './renderer-sass.js';
import { rendererStylus } from './renderer-stylus.js';
import { rendererRollup } from './rollup/index.js';

if (typeof hexo !== 'undefined') {
  // assign hexo to global variable
  if (!(global as any).hexo) (global as any).hexo = hexo;

  // define options
  const options = getRendererConfig(hexo);

  // initial process - restoration
  // hexo.extend.filter.register('after_init', function (this: Hexo) {
  //   loadPostData(this);
  // });

  // clean temp files after clean
  hexo.extend.filter.register('after_clean', function () {
    return del(path.join(hexo.base_dir, 'tmp/hexo-renderers'));
  });

  // register custom helper
  registerCustomHelper(hexo);
  // register custom generator
  registerCustomGenerator(hexo, options.generator);
  // collect post information
  // hexo.extend.filter.register('after_post_render', function (this: Hexo, post: any) {
  //   return collectorPost(post, this);
  // });

  if (options.engines.length > 0) {
    // activate specific engine
    for (let i = 0; i < options.engines.length; i++) {
      const engine = options.engines[i];
      switch (engine) {
        case 'ejs':
          rendererEjs(hexo);
          break;
        case 'pug':
          rendererPug(hexo);
          break;
        case 'dartsass':
          rendererDartSass(hexo);
          break;
        case 'rollup':
          rendererRollup(hexo);
          break;
        case 'sass':
          rendererSass(hexo);
          break;
        case 'stylus':
          rendererStylus(hexo);
          break;
        case 'nunjucks':
        case 'njk':
          rendererNunjucks(hexo);
          break;
        case 'markdown-it':
          rendererMarkdownIt(hexo);
          break;
      }
    }
  } else {
    hexo.log.info(logname, 'activating all engines');
    // activate all available engines
    rendererNunjucks(hexo);
    rendererEjs(hexo);
    rendererPug(hexo);
    rendererStylus(hexo);
    // rendererRollup(hexo);
    // rendererDartSass(hexo);
    rendererSass(hexo);
    rendererMarkdownIt(hexo);
  }
}
