"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectArrayIndexOf = objectArrayIndexOf;
exports.getRelatedPosts = getRelatedPosts;
var fs_extra_1 = __importDefault(require("fs-extra"));
var lodash_1 = __importDefault(require("lodash"));
var path_1 = __importDefault(require("path"));
var sbg_utility_1 = require("sbg-utility");
var collector_1 = require("./collector");
var util_1 = require("./util");
var assign = lodash_1.default.assign;
function addCount(array, searchProperty, newProperty) {
    return array.reduce(function (newArray, item) {
        var i = objectArrayIndexOf(newArray, item[searchProperty], searchProperty);
        if (i === -1) {
            item[newProperty] = 1;
            newArray.push(item);
        }
        else {
            newArray[i][newProperty] = newArray[i][newProperty] + 1;
        }
        return newArray;
    }, []);
}
/**
 * get index of array of objects by property
 * @param array
 * @param searchTerm
 * @param property
 * @returns
 */
function objectArrayIndexOf(array, searchTerm, property) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][property] === searchTerm)
            return i;
    }
    return -1;
}
function dynamicSort(property, isAscending) {
    var sortOrder = -1;
    if (isAscending)
        sortOrder = 1;
    return function (a, b) {
        var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
}
/**
 * populate related posts
 * @param hexo hexo instance
 */
function getRelatedPosts(hexo) {
    var _a;
    var options = (_a = hexo.config.renderers) === null || _a === void 0 ? void 0 : _a.generator;
    if (Array.isArray(options)) {
        if (!options.includes('related-posts'))
            return;
    }
    else {
        return;
    }
    hexo.extend.helper.register('list_related_posts', function (options) {
        var _this = this;
        var _a, _b;
        /** related post cache file */
        var relatedDb = path_1.default.join(hexo.base_dir, 'tmp/hexo-renderers/related-posts', (0, sbg_utility_1.slugify)((_a = this.page) === null || _a === void 0 ? void 0 : _a.title), 'related.json');
        options = assign({
            maxCount: 5,
            orderBy: 'date',
            isAscending: false,
            pClass: 'related-posts-none',
            ulClass: 'related-posts',
            liClass: 'related-posts-item',
            aClass: 'related-posts-link',
            generateAbstract: false,
            abstractClass: 'related-posts-item-abstract',
            abstractLength: 110
        }, options || {});
        // fix descending
        var orderOption = ['date', 'random'];
        if (orderOption.indexOf(options.orderBy) === -1) {
            options.orderBy = 'date';
        }
        var postList = [];
        if (fs_extra_1.default.existsSync(relatedDb)) {
            // load from cache
            postList = (0, sbg_utility_1.jsonParseWithCircularRefs)(fs_extra_1.default.readFileSync(relatedDb, 'utf-8'));
        }
        else {
            // regenerate cache
            var post = this.post || this.page;
            if (post) {
                if ('tags' in post) {
                    var tags = post.tags;
                    if ('each' in tags) {
                        tags.each(function (tag) {
                            tag.posts.each(function (post) {
                                postList.push(post);
                            });
                        });
                    }
                }
            }
            if (postList.length === 0) {
                var thisPageTags_1 = ((_b = this.page) === null || _b === void 0 ? void 0 : _b.tags) || [];
                var postData = (0, collector_1.getPostData)().filter(function (post) {
                    var _a;
                    var tags = [];
                    if ((_a = post.tags) === null || _a === void 0 ? void 0 : _a.toArray) {
                        tags = post.tags.toArray();
                    }
                    else if (post.tags) {
                        tags = post.tags;
                    }
                    // fix post.tags is internal hexo class
                    // get only array of string tags
                    if (!tags.some)
                        tags = (0, util_1.tagName)(tags);
                    return tags.some(function (tag) { return thisPageTags_1.includes(tag); });
                });
                postList.push.apply(postList, postData);
            }
        }
        // sort post when post list not-empty
        if (postList.length > 0) {
            postList = addCount(postList, '_id', 'count');
            // delete current post from related post (prevent duplicate)
            /*const thisPostPosition = objectArrayIndexOf(postList, (post as Record<string, any>)._id, '_id');
            if (thisPostPosition !== -1) postList.splice(thisPostPosition, 1);
            */
            var currentPostIndex = postList.findIndex(function (post) { var _a, _b; return post._id === ((_a = _this.page) === null || _a === void 0 ? void 0 : _a._id) || post.title === ((_b = _this.page) === null || _b === void 0 ? void 0 : _b.title); });
            if (currentPostIndex !== -1)
                postList.splice(currentPostIndex, 1);
            if (options.orderBy === 'random') {
                (0, sbg_utility_1.array_shuffle)(postList);
            }
            else {
                postList.sort(dynamicSort(options.orderBy, options.isAscending));
            }
            postList.sort(dynamicSort('count', false));
            (0, sbg_utility_1.writefile)(relatedDb, (0, sbg_utility_1.jsonStringifyWithCircularRefs)(postList));
        }
        return postList;
    });
}
