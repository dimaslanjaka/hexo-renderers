"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rendererSass = void 0;
var node_sass_1 = __importDefault(require("node-sass"));
var path_1 = __importDefault(require("path"));
// import * as util from 'util';
var extend = Object.assign; //util['_extend'];
var sassRenderer = function (ext) {
    return function (data) {
        // support global and theme-specific config
        var userConfig = extend(this.theme.config.node_sass || {}, this.config.node_sass || {});
        var config = extend({
            data: data.text,
            file: data.path,
            outputStyle: 'nested',
            sourceComments: false,
            indentedSyntax: ext === 'sass'
        }, userConfig);
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
        config.includePaths.push(path_1.default.join(hexo.base_dir, 'node_modules'), path_1.default.join(hexo.theme_dir, 'node_modules'));
        try {
            // node-sass result object:
            // https://github.com/sass/node-sass#result-object
            var result = node_sass_1.default.renderSync(config);
            // result is now Buffer instead of String
            // https://github.com/sass/node-sass/issues/711
            return Promise.resolve(result.css.toString());
        }
        catch (error) {
            console.error(error.toString());
            throw error;
        }
    };
};
function rendererSass(hexo) {
    // associate the Sass renderer with .scss AND .sass extensions
    hexo.extend.renderer.register('scss', 'css', sassRenderer('scss'));
    hexo.extend.renderer.register('sass', 'css', sassRenderer('sass'));
}
exports.rendererSass = rendererSass;
