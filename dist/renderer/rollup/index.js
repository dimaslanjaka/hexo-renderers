'use strict';
var renderer = require('./renderer');
hexo.extend.renderer.register('js', 'js', renderer);
hexo.extend.renderer.register('mjs', 'js', renderer);
