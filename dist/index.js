var _a;
import { del } from 'sbg-utility';
import path from 'upath';
import { registerCustomGenerator } from './generator/index.js';
import { collectorPost, loadPostData } from './helper/collector.js';
import { registerCustomHelper } from './helper/index.js';
import { logname } from './helper/util.js';
import { rendererDartSass } from './renderer-dartsass.js';
import { rendererEjs } from './renderer-ejs.js';
import { default as rendererMarkdownIt } from './renderer-markdown-it.js';
import { rendererNunjucks } from './renderer-nunjucks.js';
import { rendererPug } from './renderer-pug.js';
import { rendererSass } from './renderer-sass.js';
import { rendererStylus } from './renderer-stylus.js';
import { rendererRollup } from './renderer/rollup/index.js';
if (typeof hexo !== 'undefined') {
    // assign hexo to global variable
    global.hexo = hexo;
    // define options
    const options = Object.assign({ generator: ['meta'], engines: [] }, ((_a = hexo.config.renderers) === null || _a === void 0 ? void 0 : _a.generator) || {});
    // shim v1 options
    if (Array.isArray(hexo.config.renderers)) {
        options.engines = hexo.config.renderers;
    }
    // initial process - restoration
    hexo.extend.filter.register('after_init', function () {
        loadPostData(this);
    });
    // clean temp files after clean
    hexo.extend.filter.register('after_clean', function () {
        return del(path.join(hexo.base_dir, 'tmp/hexo-renderers'));
    });
    // register custom helper
    registerCustomHelper(hexo);
    // register custom generator
    registerCustomGenerator(hexo, options.generator);
    // collect post information
    hexo.extend.filter.register('after_post_render', function (post) {
        return collectorPost(post, this);
    });
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
    }
    else {
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
export { rendererDartSass, rendererEjs, rendererMarkdownIt, rendererNunjucks, rendererPug, rendererRollup, rendererSass, rendererStylus };
