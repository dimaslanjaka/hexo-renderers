'use strict';

var fs = require('fs');
var hexoUtil = require('hexo-util');
var lodash = require('lodash');
var module$1 = require('module');
var path = require('path');
var yaml = require('yaml');
var date = require('./date.cjs');
var getAuthor = require('./getAuthor.cjs');
var getPostByLabel = require('./getPostByLabel.cjs');
var partial = require('./partial.cjs');
var relatedPosts = require('./related-posts.cjs');
var moment = require('moment-timezone');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
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

var hexoUtil__namespace = /*#__PURE__*/_interopNamespaceDefault(hexoUtil);

if (typeof require === 'undefined')
    global.require = module$1.createRequire((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('helper/index.cjs', document.baseURI).href)));
const _toArray = lodash.toArray;
const BASE_DIR = typeof hexo === 'undefined' ? process.cwd() : hexo.base_dir;
const configFile = path.join(BASE_DIR, '_config.yml');
let config = {};
if (fs.existsSync(configFile)) {
    if (typeof hexo === 'undefined') {
        config = yaml.parse(fs.readFileSync(configFile, 'utf-8'));
    }
    else {
        config = hexo.config;
    }
}
const THEME_LOCATION = path.join(process.cwd(), 'themes', config.theme || 'landscape');
path.join(THEME_LOCATION, 'scripts');
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
    else if (value instanceof Map) {
        const arr = [];
        value.forEach((v) => arr.push(v));
        return arr;
    }
    else if (value instanceof Set || typeof value === 'string') {
        return [...value];
    }
    else if (isObject(value) && value instanceof Object && Boolean(value)) {
        return Object.values(value);
    }
    return _toArray(value);
}
function json_config() {
    const hexo = this;
    const { config, theme, url_for } = hexo;
    const theme_config = {
        hostname: new URL(config.url).hostname || config.url,
        root: config.root
    };
    const hexo_config = {
        homepage: url_for('/')
    };
    return {
        theme: Object.assign(theme, theme_config),
        project: Object.assign(config, hexo_config)
    };
}
/**
 * register custom helpers
 * @param hexo
 */
function registerCustomHelper(hexo) {
    hexo.extend.helper.register('toArray', toArray);
    hexo.extend.helper.register('isObject', isObject);
    relatedPosts.getRelatedPosts(hexo);
    getAuthor.getAuthor(hexo);
    getPostByLabel.getPostByLabel(hexo);
    /**
     * Export theme config
     */
    hexo.extend.helper.register('json_config', json_config);
    // json_data('main', json_config())
    hexo.extend.helper.register('json_data', function (name, ...data) {
        const json = data.length === 1 ? data[0] : Object.assign({}, ...data);
        return `<script class="json-config" data-name="${name}" type="application/json">${JSON.stringify(json).replace(/</g, '\\u003c')}</script>`;
    });
    hexo.extend.helper.register('getPosts', function getPosts() {
        const page = this['page'];
        return page === null || page === void 0 ? void 0 : page.posts;
    });
    hexo.extend.helper.register('partialWithLayout', partial.partialWithLayout);
    hexo.extend.helper.register('date', date.date);
    //hexo.extend.helper.register('format_date', date.date);
    //hexo.extend.helper.register('date_format', date.date);
    hexo.extend.helper.register('date_xml', date.date_xml);
    hexo.extend.helper.register('time', date.time);
    hexo.extend.helper.register('full_date', date.full_date);
    hexo.extend.helper.register('relative_date', date.relative_date);
    hexo.extend.helper.register('time_tag', date.time_tag);
    hexo.extend.helper.register('moment', moment);
    hexo.extend.helper.register('url_for', hexoUtil__namespace.url_for);
    for (const key in hexoUtil__namespace) {
        if (Object.prototype.hasOwnProperty.call(hexoUtil__namespace, key)) {
            const helper = hexoUtil__namespace[key];
            if (typeof helper === 'function')
                hexo.extend.helper.register(key, helper);
        }
    }
}

exports.BASE_DIR = BASE_DIR;
exports.isObject = isObject;
exports.registerCustomHelper = registerCustomHelper;
exports.toArray = toArray;
