import { StoreFunction } from 'hexo/dist/extend/renderer-d.js';
import { del } from 'sbg-utility';
import path from 'upath';
import { initCli } from './cli.js';
import getRendererConfig from './config.js';
import { htmlFixer } from './fixer/html.js';
import { registerCustomGenerator } from './generator/index.js';
import { registerCustomHelper } from './helper/index.js';
import { isPackageInstalled } from './helper/util.js';
import { rendererDartSass } from './renderer-dartsass.js';
import { rendererEjs } from './renderer-ejs.js';
import { rendererMarkdownIt } from './renderer-markdown-it.js';
import { rendererMarked } from './renderer-marked.js';
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

  // Initialize CLI
  initCli(hexo);

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

  hexo.log.info('activating renderer engine', options.engines.join(', '));
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
      case 'marked':
        rendererMarked(hexo);
        break;
    }
  }

  // enable marked renderer when markdown-it not enabled
  if (
    !isPackageInstalled('hexo-renderer-marked') &&
    !options.engines.includes('marked') &&
    !options.engines.includes('markdown-it')
  ) {
    hexo.log.info('Enabling renderer marked');
    rendererMarked(hexo);
  }

  if (options.fix.html) {
    // all in one html fixer
    hexo.extend.filter.register('after_render:html', htmlFixer as StoreFunction);
  }
}
