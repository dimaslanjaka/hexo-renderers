'use strict';

require('cheerio');
require('fs-extra');
require('path');
require('sbg-utility');
require('./util.cjs');

let postData = [];
/**
 * get loaded post data (getter)
 * @returns
 */
const getPostData = () => postData;

exports.getPostData = getPostData;
