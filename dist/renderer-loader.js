"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var custom_helpers_1 = require("./custom-helpers");
var generator_1 = require("./generator");
var renderer_dartsass_1 = require("./renderer-dartsass");
var renderer_ejs_1 = require("./renderer-ejs");
var renderer_markdown_it_1 = __importDefault(require("./renderer-markdown-it"));
var renderer_nunjucks_1 = require("./renderer-nunjucks");
var renderer_pug_1 = require("./renderer-pug");
var renderer_sass_1 = require("./renderer-sass");
var renderer_stylus_1 = require("./renderer-stylus");
var logname = ansi_colors_1.default.magenta('hexo-renderers');
if (typeof hexo !== 'undefined') {
    // assign hexo to global variable
    global.hexo = hexo;
    var config = hexo.config;
    var renderers = config['renderers'];
    // register custom helper
    (0, custom_helpers_1.registerCustomHelper)(hexo);
    // register custom generator
    (0, generator_1.registerCustomGenerator)(hexo);
    var engines = [];
    if (Array.isArray(renderers)) {
        engines = renderers;
    }
    if (engines.length > 0) {
        // activate specific engine
        for (var i = 0; i < engines.length; i++) {
            var engine = engines[i];
            switch (engine) {
                case 'ejs':
                    (0, renderer_ejs_1.rendererEjs)(hexo);
                    break;
                case 'pug':
                    (0, renderer_pug_1.rendererPug)(hexo);
                    break;
                case 'dartsass':
                    (0, renderer_dartsass_1.rendererDartSass)(hexo);
                    break;
                case 'sass':
                    (0, renderer_sass_1.rendererSass)(hexo);
                    break;
                case 'stylus':
                    (0, renderer_stylus_1.rendererStylus)(hexo);
                    break;
                case 'nunjucks':
                case 'njk':
                    (0, renderer_nunjucks_1.rendererNunjucks)(hexo);
                    break;
                case 'markdown-it':
                    (0, renderer_markdown_it_1.default)(hexo);
                    break;
            }
        }
    }
    else {
        // activate all available engines
        (0, renderer_nunjucks_1.rendererNunjucks)(hexo);
        (0, renderer_ejs_1.rendererEjs)(hexo);
        (0, renderer_pug_1.rendererPug)(hexo);
        (0, renderer_stylus_1.rendererStylus)(hexo);
        // rendererDartSass(hexo);
        (0, renderer_sass_1.rendererSass)(hexo);
        (0, renderer_markdown_it_1.default)(hexo);
    }
}
else {
    console.error(logname, 'not hexo instance');
}
