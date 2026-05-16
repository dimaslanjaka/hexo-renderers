import 'cheerio';
import 'fs-extra';
import 'path';
import 'sbg-utility';
import './util.js';

let postData = [];
/**
 * get loaded post data (getter)
 * @returns
 */
const getPostData = () => postData;

export { getPostData };
