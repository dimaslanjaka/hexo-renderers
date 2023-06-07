"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatedPosts = void 0;
var lodash_1 = __importDefault(require("lodash"));
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
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function getRelatedPosts(hexo) {
    hexo.extend.helper.register('list_related_posts', function (options) {
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
            var thisPageTags_1 = this.page.tags || [];
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
        // sort post when post list not-empty
        if (postList.length > 0) {
            postList = addCount(postList, '_id', 'count');
            var thisPostPosition = objectArrayIndexOf(postList, post._id, '_id');
            postList.splice(thisPostPosition, 1);
            if (options.orderBy === 'random') {
                postList = shuffle(postList);
            }
            else {
                postList = postList.sort(dynamicSort(options.orderBy, options.isAscending));
            }
            postList = postList.sort(dynamicSort('count', false));
        }
        return postList;
    });
}
exports.getRelatedPosts = getRelatedPosts;
