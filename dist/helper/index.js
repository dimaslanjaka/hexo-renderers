import fs from 'fs';
import * as hexoUtil from 'hexo-util';
import lodash from 'lodash';
import { createRequire } from 'module';
import path from 'path';
import yaml from 'yaml';
import { date, date_xml, time, full_date, relative_date, time_tag } from './date.js';
import { getAuthor } from './getAuthor.js';
import { getPostByLabel } from './getPostByLabel.js';
import { partialWithLayout } from './partial.js';
import { getRelatedPosts } from './related-posts.js';
import moment from 'moment-timezone';

if (typeof require === 'undefined')
    global.require = createRequire(import.meta.url);
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
    getRelatedPosts(hexo);
    getAuthor(hexo);
    getPostByLabel(hexo);
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
    hexo.extend.helper.register('partialWithLayout', partialWithLayout);
    hexo.extend.helper.register('date', date);
    //hexo.extend.helper.register('format_date', date.date);
    //hexo.extend.helper.register('date_format', date.date);
    hexo.extend.helper.register('date_xml', date_xml);
    hexo.extend.helper.register('time', time);
    hexo.extend.helper.register('full_date', full_date);
    hexo.extend.helper.register('relative_date', relative_date);
    hexo.extend.helper.register('time_tag', time_tag);
    hexo.extend.helper.register('moment', moment);
    hexo.extend.helper.register('url_for', hexoUtil.url_for);
    for (const key in hexoUtil) {
        if (Object.prototype.hasOwnProperty.call(hexoUtil, key)) {
            const helper = hexoUtil[key];
            if (typeof helper === 'function')
                hexo.extend.helper.register(key, helper);
        }
    }
}

export { BASE_DIR, isObject, registerCustomHelper, toArray };
