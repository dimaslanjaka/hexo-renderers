'use strict';
hexo.extend.helper.register('getPosts', function () {
    var self = this;
    var page = self.page;
    return page.posts;
});
hexo.extend.helper.register('getPostByLabel', 
/**
 * hexo get post by key with name
 * @param {'tags'|'categories'} by
 * @param {string[]} filternames
 * @returns {Record<string, string>[]}
 */
function (by, filternames) {
    var hexo = this;
    /**
     * @type {any[]}
     */
    var data = hexo.site[by].data;
    var map = filternames
        .map(function (filtername) {
        var filter = data.filter(function (_a) {
            var name = _a.name;
            return String(name).toLowerCase() == filtername.toLowerCase();
        });
        return filter.map(function (group) {
            return group.posts.map(
            /**
             * @param {import('hexo').Post.Data} post
             */
            function (_a) {
                var title = _a.title, permalink = _a.permalink, thumbnail = _a.thumbnail, photos = _a.photos;
                // get title and permalink
                // for more keys, you can look at https://github.com/dimaslanjaka/nodejs-package-types/blob/ec9b509d81eefdfada79f1658ac02118936a1e5a/index.d.ts#L757-L762
                return { title: title, permalink: permalink, thumbnail: thumbnail, photos: photos };
            });
        });
    })
        // flattern all multidimensional arrays
        // to get array of hexo post object
        .flat(2);
    // dump
    // console.log(map);
    // return an JSON string
    // return JSON.stringify(map, null, 2);
    // return an Array
    return map;
});
/**
 * Returns a JSON stringified version of the value, safe for inclusion in an
 * inline <script> tag. The optional argument 'spaces' can be used for
 * pretty-printing.
 *
 * Output is NOT safe for inclusion in HTML! If that's what you need, use the
 * built-in 'dump' filter instead.
 *
 * @example
 * {{ data | json_stringify }}
 */
hexo.extend.helper.register('json_stringify', function (value, spaces) {
    var nunjucks = require('nunjucks');
    if (value instanceof nunjucks.runtime.SafeString) {
        value = value.toString();
    }
    var jsonString = JSON.stringify(value, null, spaces).replace(/</g, '\\u003c');
    return nunjucks.runtime.markSafe(jsonString);
});
hexo.extend.helper.register('object_keys', function (obj) {
    return Object.keys(obj);
});
/**
 * fix url
 * - remove double slashes
 * - decode url
 * @param {string} url
 * @param {Record<string,any>} options
 * @returns
 */
function fixURL(url, options) {
    if (options === void 0) { options = {}; }
    var fixed = url.replace(/([^:]\/)\/+/gm, '$1');
    if (options) {
        if (options.decode)
            return decodeURI(fixed);
    }
    return fixed;
}
hexo.extend.helper.register('fixURL', fixURL);
hexo.extend.helper.register('canonical_url', function (lang) {
    var path = this.page.path;
    if (lang && lang !== 'en')
        path = lang + '/' + path;
    var util = require('hexo-util');
    return util.full_url_for(path);
});
hexo.extend.helper.register('url_for_lang', function (path) {
    var lang = this.page.lang;
    var url = this.url_for(path);
    if (lang !== 'en' && url[0] === '/')
        url = '/' + lang + url;
    return url;
});
hexo.extend.helper.register('lang_name', function (lang) {
    var data = this.site.data.languages[lang];
    return data.name || data;
});
hexo.extend.filter.register('template_locals', function (locals) {
    var page = locals.page;
    if (page.archive)
        page.title = 'Archive';
});
