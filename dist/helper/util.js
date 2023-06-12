"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagName = exports.categorieName = void 0;
/** get category names */
var categorieName = function (inCategories) {
    if (!inCategories)
        return [];
    // return when first array is string
    if (typeof inCategories.data[0] === 'string')
        return inCategories;
    var catName = '';
    for (var r = 0; r < inCategories.data.length; r++) {
        if (catName != '')
            catName += ' > ';
        catName += inCategories.data[r].name;
    }
    return catName;
};
exports.categorieName = categorieName;
/** get tag names */
var tagName = function (inTags) {
    if (!inTags)
        return [];
    // return when first array is string
    if (typeof inTags.data[0] === 'string')
        return inTags;
    var retTags = [];
    if (Array.isArray(inTags.data)) {
        inTags.data.forEach(function (item) {
            retTags.push(item.name);
        });
    }
    return retTags;
};
exports.tagName = tagName;
