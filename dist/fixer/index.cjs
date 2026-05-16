'use strict';

var html = require('./html.cjs');

function initHtmlFixer(hexo) {
    // all in one html fixer
    hexo.extend.filter.register('after_render:html', html.htmlFixer);
}

exports.initHtmlFixer = initHtmlFixer;
