"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.rendererStylus = exports.rendererSass = exports.rendererRollup = exports.rendererPug = exports.rendererNunjucks = exports.rendererMarkdownIt = exports.rendererEjs = exports.rendererDartSass = void 0;
var sbg_utility_1 = require("sbg-utility");
var upath_1 = __importDefault(require("upath"));
var generator_1 = require("./generator");
var helper_1 = require("./helper");
var collector_1 = require("./helper/collector");
var util_1 = require("./helper/util");
var renderer_dartsass_1 = require("./renderer-dartsass");
Object.defineProperty(exports, "rendererDartSass", { enumerable: true, get: function () { return renderer_dartsass_1.rendererDartSass; } });
var renderer_ejs_1 = require("./renderer-ejs");
Object.defineProperty(exports, "rendererEjs", { enumerable: true, get: function () { return renderer_ejs_1.rendererEjs; } });
var renderer_markdown_it_1 = __importDefault(require("./renderer-markdown-it"));
Object.defineProperty(exports, "rendererMarkdownIt", { enumerable: true, get: function () { return renderer_markdown_it_1.default; } });
var renderer_nunjucks_1 = require("./renderer-nunjucks");
Object.defineProperty(exports, "rendererNunjucks", { enumerable: true, get: function () { return renderer_nunjucks_1.rendererNunjucks; } });
var renderer_pug_1 = require("./renderer-pug");
Object.defineProperty(exports, "rendererPug", { enumerable: true, get: function () { return renderer_pug_1.rendererPug; } });
var renderer_sass_1 = require("./renderer-sass");
Object.defineProperty(exports, "rendererSass", { enumerable: true, get: function () { return renderer_sass_1.rendererSass; } });
var renderer_stylus_1 = require("./renderer-stylus");
Object.defineProperty(exports, "rendererStylus", { enumerable: true, get: function () { return renderer_stylus_1.rendererStylus; } });
var rollup_1 = require("./renderer/rollup");
Object.defineProperty(exports, "rendererRollup", { enumerable: true, get: function () { return rollup_1.rendererRollup; } });
if (typeof hexo !== 'undefined') {
    // assign hexo to global variable
    global.hexo = hexo;
    // define options
    var options = Object.assign({ generator: ['meta'], engines: [] }, ((_a = hexo.config.renderers) === null || _a === void 0 ? void 0 : _a.generator) || {});
    // shim v1 options
    if (Array.isArray(hexo.config.renderers)) {
        options.engines = hexo.config.renderers;
    }
    // initial process - restoration
    hexo.extend.filter.register('after_init', function () {
        (0, collector_1.loadPostData)(this);
    });
    // clean temp files after clean
    hexo.extend.filter.register('after_clean', function () {
        return (0, sbg_utility_1.del)(upath_1.default.join(hexo.base_dir, 'tmp/hexo-renderers'));
    });
    // register custom helper
    (0, helper_1.registerCustomHelper)(hexo);
    // register custom generator
    (0, generator_1.registerCustomGenerator)(hexo, options.generator);
    // collect post information
    hexo.extend.filter.register('after_post_render', function (post) {
        return (0, collector_1.collectorPost)(post, this);
    });
    if (options.engines.length > 0) {
        // activate specific engine
        for (var i = 0; i < options.engines.length; i++) {
            var engine = options.engines[i];
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
                case 'rollup':
                    (0, rollup_1.rendererRollup)(hexo);
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
        hexo.log.info(util_1.logname, 'activating all engines');
        // activate all available engines
        (0, renderer_nunjucks_1.rendererNunjucks)(hexo);
        (0, renderer_ejs_1.rendererEjs)(hexo);
        (0, renderer_pug_1.rendererPug)(hexo);
        (0, renderer_stylus_1.rendererStylus)(hexo);
        // rendererRollup(hexo);
        // rendererDartSass(hexo);
        (0, renderer_sass_1.rendererSass)(hexo);
        (0, renderer_markdown_it_1.default)(hexo);
    }
}
