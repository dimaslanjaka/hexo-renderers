"use strict";
// forked from https://gist.github.com/mh61503891/544d3c1eefd00b1012463b860222d34f
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaJsonCreator = void 0;
var meta = {
    tags: [],
    posts: [],
    categories: []
};
/**
 * create `meta.json` can be accessed at `http://example.com/meta.json`
 * @param hexo
 */
function metaJsonCreator(hexo) {
    hexo.extend.generator.register('meta', function (locals) {
        locals.tags.sort('name').each(function (tag) {
            if (!meta.tags.includes(tag.name))
                meta.tags.push(tag.name);
        });
        locals.categories.sort('name').each(function (category) {
            if (!meta.categories.includes(category.name))
                meta.categories.push(category.name);
        });
        locals.posts.sort('name').each(function (post) {
            meta.posts.push({
                title: post.title,
                url: encodeURI(post.permalink),
                // get modified date first
                date: post.updated.toDate().toISOString() || post.date.toDate().toISOString()
            });
        });
        return { path: 'meta.json', data: JSON.stringify(meta) };
    });
}
exports.metaJsonCreator = metaJsonCreator;
