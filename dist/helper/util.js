"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logname = exports.tagName = exports.categorieName = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
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
    if (!inTags || !Array.isArray(inTags.data))
        return [];
    // return when first array is string
    if (typeof inTags.data[0] === 'string')
        return inTags;
    var retTags = [];
    inTags.data.forEach(function (item) {
        retTags.push(item.name);
    });
    return retTags;
};
exports.tagName = tagName;
exports.logname = ansi_colors_1.default.magentaBright('hexo-renderers');
