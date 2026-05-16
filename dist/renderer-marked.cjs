'use strict';

var options = require('./marked/options.cjs');
var rendererNew = require('./marked/renderer-new.cjs');

function rendererMarked(hexo) {
    hexo.config.marked = Object.assign(options.defaultRendererMarkedOptions, hexo.config.marked);
    rendererNew.default.prototype.disableNunjucks = Boolean(hexo.config.marked.disableNunjucks);
    rendererNew.default.disableNunjucks = Boolean(hexo.config.marked.disableNunjucks);
    hexo.extend.renderer.register('md', 'html', rendererNew.default, true);
    hexo.extend.renderer.register('markdown', 'html', rendererNew.default, true);
    hexo.extend.renderer.register('mkd', 'html', rendererNew.default, true);
    hexo.extend.renderer.register('mkdn', 'html', rendererNew.default, true);
    hexo.extend.renderer.register('mdwn', 'html', rendererNew.default, true);
    hexo.extend.renderer.register('mdtxt', 'html', rendererNew.default, true);
    hexo.extend.renderer.register('mdtext', 'html', rendererNew.default, true);
}

exports.rendererMarked = rendererMarked;
