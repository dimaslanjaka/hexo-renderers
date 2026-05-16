'use strict';

var renderer = require('./renderer.cjs');

function rendererRollup(hexo) {
    hexo.extend.renderer.register('js', 'js', renderer);
    hexo.extend.renderer.register('mjs', 'js', renderer);
}

exports.rendererRollup = rendererRollup;
