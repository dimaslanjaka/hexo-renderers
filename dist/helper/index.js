"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomHelper = exports.BASE_DIR = void 0;
var fs_1 = __importDefault(require("fs"));
var hexoUtil = __importStar(require("hexo-util"));
var lodash_1 = __importDefault(require("lodash"));
var path_1 = __importDefault(require("path"));
var yaml_1 = __importDefault(require("yaml"));
var date = __importStar(require("./date"));
var getAuthor_1 = require("./getAuthor");
var getPostByLabel_1 = require("./getPostByLabel");
var partial_1 = require("./partial");
var related_posts_1 = require("./related-posts");
var _toArray = lodash_1.default.toArray;
exports.BASE_DIR = typeof hexo === 'undefined' ? process.cwd() : hexo.base_dir;
var config;
if (typeof hexo === 'undefined') {
    config = yaml_1.default.parse(fs_1.default.readFileSync(path_1.default.join(exports.BASE_DIR, '_config.yml')).toString());
}
else {
    config = yaml_1.default.parse(fs_1.default.readFileSync(path_1.default.join(exports.BASE_DIR, '_config.yml')).toString());
}
var THEME_LOCATION = path_1.default.join(process.cwd(), 'themes', config.theme || 'landscape');
var _THEME_SCRIPTS = path_1.default.join(THEME_LOCATION, 'scripts');
// loadScripts(THEME_SCRIPTS);
/**
 * load all scripts
 * @param base
 */
function _loadScripts(base) {
    if (fs_1.default.existsSync(base)) {
        fs_1.default.readdirSync(base).forEach(function (p) {
            var full = path_1.default.join(base, p);
            if (fs_1.default.statSync(full).isFile()) {
                require(full);
            }
            else if (fs_1.default.statSync(full).isDirectory()) {
                _loadScripts(full);
            }
        });
    }
}
function isObject(value) {
    return typeof value === 'object' && value !== null && value !== undefined;
}
function toArray(value) {
    if (isObject(value) && typeof value.toArray === 'function') {
        return value.toArray();
    }
    else if (Array.isArray(value)) {
        return value;
    }
    return _toArray(value);
}
/**
 * register custom helpers
 * @param hexo
 */
function registerCustomHelper(hexo) {
    hexo.extend.helper.register('toArray', toArray);
    hexo.extend.helper.register('isObject', isObject);
    (0, related_posts_1.getRelatedPosts)(hexo);
    (0, getAuthor_1.getAuthor)(hexo);
    (0, getPostByLabel_1.getPostByLabel)(hexo);
    /**
     * Export theme config
     */
    hexo.extend.helper.register('json_config', function () {
        var hexo = this;
        var config = hexo.config, theme = hexo.theme, url_for = hexo.url_for, __ = hexo.__;
        var theme_config = {
            hostname: new URL(config.url).hostname || config.url,
            root: config.root
        };
        var hexo_config = {
            homepage: url_for('/')
        };
        return {
            theme: Object.assign(theme, theme_config),
            project: Object.assign(config, hexo_config)
        };
    });
    // json_data('main', json_config())
    hexo.extend.helper.register('json_data', function (name) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        var json = data.length === 1 ? data[0] : Object.assign.apply(Object, __spreadArray([{}], data, false));
        return "<script class=\"json-config\" data-name=\"".concat(name, "\" type=\"application/json\">").concat(JSON.stringify(json).replace(/</g, '\\u003c'), "</script>");
    });
    hexo.extend.helper.register('getPosts', function getPosts() {
        var page = this['page'];
        return page.posts;
    });
    hexo.extend.helper.register('partialWithLayout', partial_1.partialWithLayout);
    hexo.extend.helper.register('date', date.date);
    //hexo.extend.helper.register('format_date', date.date);
    //hexo.extend.helper.register('date_format', date.date);
    hexo.extend.helper.register('date_xml', date.date_xml);
    hexo.extend.helper.register('time', date.time);
    hexo.extend.helper.register('full_date', date.full_date);
    hexo.extend.helper.register('relative_date', date.relative_date);
    hexo.extend.helper.register('time_tag', date.time_tag);
    hexo.extend.helper.register('moment', date.moment);
    hexo.extend.helper.register('url_for', hexoUtil.url_for);
    for (var key in hexoUtil) {
        if (Object.prototype.hasOwnProperty.call(hexoUtil, key)) {
            var helper = hexoUtil[key];
            hexo.extend.helper.register(key, helper);
        }
    }
}
exports.registerCustomHelper = registerCustomHelper;
