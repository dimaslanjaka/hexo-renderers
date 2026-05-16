'use strict';

var path = require('path');
var sass = require('sass');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var sass__namespace = /*#__PURE__*/_interopNamespaceDefault(sass);

// import * as util from 'util';
const extend = Object.assign; //util['_extend'];
const sassRenderer = (ext) => function (data) {
    // support global and theme-specific config
    // Backward compatibility: support both 'sass' and legacy 'node_sass' config keys
    const userConfig = extend(this.theme.config.sass || this.theme.config.node_sass || {}, this.config.sass || this.config.node_sass || {});
    let config = extend({
        data: data.text,
        file: data.path,
        outputStyle: 'nested',
        sourceComments: false,
        indentedSyntax: ext === 'sass'
    }, userConfig);
    // Map legacy 'nested' outputStyle to 'expanded' for Dart Sass compatibility
    if (config.outputStyle === 'nested') {
        config.outputStyle = 'expanded';
    }
    // turn includePaths into array
    if (typeof config.includePaths === 'string') {
        // string
        config.includePaths = [config.includePaths];
    }
    else if (!config.includePaths) {
        // undefined
        config.includePaths = [];
    }
    // include installed library locations into compiler
    config.includePaths.push(path.join(hexo.base_dir, 'node_modules'), path.join(hexo.theme_dir, 'node_modules'));
    try {
        // sass result object:
        // https://github.com/sass/dart-sass#result-object
        const result = sass__namespace.renderSync(config);
        // result is now Buffer instead of String
        // https://github.com/sass/dart-sass#result-object
        return Promise.resolve(result.css.toString());
    }
    catch (error) {
        console.error(error.toString());
        throw error;
    }
};
function rendererSass(hexo) {
    // associate the Sass renderer with .scss AND .sass extensions
    hexo.extend.renderer.register('scss', 'css', sassRenderer('scss'));
    hexo.extend.renderer.register('sass', 'css', sassRenderer('sass'));
}

exports.rendererSass = rendererSass;
