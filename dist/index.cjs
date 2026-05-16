'use strict';

var sbgUtility = require('sbg-utility');
var path = require('upath');
var cli = require('./cli.cjs');
var config = require('./config.cjs');
var index$3 = require('./fixer/index.cjs');
var index$1 = require('./generator/index.cjs');
var index = require('./helper/index.cjs');
var util = require('./helper/util.cjs');
var rendererDartsass = require('./renderer-dartsass.cjs');
var rendererEjs = require('./renderer-ejs.cjs');
var rendererMarkdownIt = require('./renderer-markdown-it.cjs');
var rendererMarked = require('./renderer-marked.cjs');
var rendererNunjucks = require('./renderer-nunjucks.cjs');
var rendererPug = require('./renderer-pug.cjs');
var rendererSass = require('./renderer-sass.cjs');
var rendererStylus = require('./renderer-stylus.cjs');
var index$2 = require('./rollup/index.cjs');

if (typeof hexo !== 'undefined') {
    // assign hexo to global variable
    if (!global.hexo)
        global.hexo = hexo;
    // define options
    const options = config(hexo);
    // initial process - restoration
    // hexo.extend.filter.register('after_init', function (this: Hexo) {
    //   loadPostData(this);
    // });
    // Initialize CLI
    cli.initCli(hexo);
    // clean temp files after clean
    hexo.extend.filter.register('after_clean', function () {
        return sbgUtility.del(path.join(hexo.base_dir, 'tmp/hexo-renderers'));
    });
    // register custom helper
    index.registerCustomHelper(hexo);
    // register custom generator
    index$1.registerCustomGenerator(hexo, options.generator);
    // collect post information
    // hexo.extend.filter.register('after_post_render', function (this: Hexo, post: any) {
    //   return collectorPost(post, this);
    // });
    hexo.log.info('activating renderer engine', options.engines.join(', '));
    for (let i = 0; i < options.engines.length; i++) {
        const engine = options.engines[i];
        switch (engine) {
            case 'ejs':
                rendererEjs.rendererEjs(hexo);
                break;
            case 'pug':
                rendererPug.rendererPug(hexo);
                break;
            case 'dartsass':
                rendererDartsass.rendererDartSass(hexo);
                break;
            case 'rollup':
                index$2.rendererRollup(hexo);
                break;
            case 'sass':
                rendererSass.rendererSass(hexo);
                break;
            case 'stylus':
                rendererStylus.rendererStylus(hexo);
                break;
            case 'nunjucks':
            case 'njk':
                rendererNunjucks.rendererNunjucks(hexo);
                break;
            case 'markdown-it':
                rendererMarkdownIt.rendererMarkdownIt(hexo);
                break;
            case 'marked':
                rendererMarked.rendererMarked(hexo);
                break;
        }
    }
    // enable marked renderer when markdown-it not enabled
    if (!util.isPackageInstalled('hexo-renderer-marked') &&
        !options.engines.includes('marked') &&
        !options.engines.includes('markdown-it')) {
        hexo.log.info('Enabling renderer marked');
        rendererMarked.rendererMarked(hexo);
    }
    if (options.fix.html) {
        index$3.initHtmlFixer(hexo);
    }
}
