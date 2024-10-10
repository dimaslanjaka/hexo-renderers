import fs from 'fs-extra';
import lodash from 'lodash';
import path from 'path';
import { array_shuffle, jsonParseWithCircularRefs, jsonStringifyWithCircularRefs, slugify, writefile } from 'sbg-utility';
import { getPostData } from './collector.js';
import { tagName } from './util.js';
const assign = lodash.assign;
function addCount(array, searchProperty, newProperty) {
    return array.reduce(function (newArray, item) {
        const i = objectArrayIndexOf(newArray, item[searchProperty], searchProperty);
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
export function objectArrayIndexOf(array, searchTerm, property) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][property] === searchTerm)
            return i;
    }
    return -1;
}
function dynamicSort(property, isAscending) {
    let sortOrder = -1;
    if (isAscending)
        sortOrder = 1;
    return function (a, b) {
        const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
}
/**
 * populate related posts
 * @param hexo hexo instance
 */
export function getRelatedPosts(hexo) {
    var _a;
    const options = (_a = hexo.config.renderers) === null || _a === void 0 ? void 0 : _a.generator;
    if (Array.isArray(options)) {
        if (!options.includes('related-posts'))
            return;
    }
    else {
        return;
    }
    hexo.extend.helper.register('list_related_posts', function (options) {
        var _a, _b;
        /** related post cache file */
        const relatedDb = path.join(hexo.base_dir, 'tmp/hexo-renderers/related-posts', slugify((_a = this.page) === null || _a === void 0 ? void 0 : _a.title), 'related.json');
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
        const orderOption = ['date', 'random'];
        if (orderOption.indexOf(options.orderBy) === -1) {
            options.orderBy = 'date';
        }
        let postList = [];
        if (fs.existsSync(relatedDb)) {
            // load from cache
            postList = jsonParseWithCircularRefs(fs.readFileSync(relatedDb, 'utf-8'));
        }
        else {
            // regenerate cache
            const post = this.post || this.page;
            if (post) {
                if ('tags' in post) {
                    const tags = post.tags;
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
                const thisPageTags = ((_b = this.page) === null || _b === void 0 ? void 0 : _b.tags) || [];
                const postData = getPostData().filter((post) => {
                    var _a;
                    let tags = [];
                    if ((_a = post.tags) === null || _a === void 0 ? void 0 : _a.toArray) {
                        tags = post.tags.toArray();
                    }
                    else if (post.tags) {
                        tags = post.tags;
                    }
                    // fix post.tags is internal hexo class
                    // get only array of string tags
                    if (!tags.some)
                        tags = tagName(tags);
                    return tags.some((tag) => thisPageTags.includes(tag));
                });
                postList.push(...postData);
            }
        }
        // sort post when post list not-empty
        if (postList.length > 0) {
            postList = addCount(postList, '_id', 'count');
            // delete current post from related post (prevent duplicate)
            /*const thisPostPosition = objectArrayIndexOf(postList, (post as Record<string, any>)._id, '_id');
            if (thisPostPosition !== -1) postList.splice(thisPostPosition, 1);
            */
            const currentPostIndex = postList.findIndex((post) => { var _a, _b; return post._id === ((_a = this.page) === null || _a === void 0 ? void 0 : _a._id) || post.title === ((_b = this.page) === null || _b === void 0 ? void 0 : _b.title); });
            if (currentPostIndex !== -1)
                postList.splice(currentPostIndex, 1);
            if (options.orderBy === 'random') {
                array_shuffle(postList);
            }
            else {
                postList.sort(dynamicSort(options.orderBy, options.isAscending));
            }
            postList.sort(dynamicSort('count', false));
            writefile(relatedDb, jsonStringifyWithCircularRefs(postList));
        }
        return postList;
    });
}
