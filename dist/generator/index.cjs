'use strict';

var meta = require('./meta.cjs');

function registerCustomGenerator(hexo, generators) {
    if ('meta' in generators)
        meta.metaJsonCreator(hexo);
}

exports.registerCustomGenerator = registerCustomGenerator;
