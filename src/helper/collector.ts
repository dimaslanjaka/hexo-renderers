import * as cheerio from 'cheerio';
import fs from 'fs-extra';
import Hexo from 'hexo';
import path from 'path';
import {
  copyPath,
  jsonParseWithCircularRefs,
  jsonStringifyWithCircularRefs,
  md5,
  md5FileSync,
  writefile
} from 'sbg-utility';
import type { HexoLocalsData } from './hexoLocalsData.js';
import { DeepPartial, categoriesName, logname, tagName } from './util.js';

let postData: HexoLocalsData[] = [];

/**
 * get post database path
 * @param hexo
 * @returns
 */
export function postDataFilePath(hexo: Hexo) {
  return path.join(hexo.base_dir, 'tmp/hexo-renderers/post-data.json');
}

/**
 * load existing database (initial only)
 */
export function loadPostData(hexo: Hexo) {
  const file = postDataFilePath(hexo);
  if (fs.existsSync(file)) {
    // postData.push(...jsonParseWithCircularRefs(fs.readFileSync(file, 'utf-8')));
    try {
      postData = jsonParseWithCircularRefs(fs.readFileSync(file, 'utf-8'));
    } catch (e: any) {
      copyPath(file, path.join(hexo.base_dir, 'tmp/hexo-renderers/errors/loadPostData.json'));
      const tag = 'fail load post data';
      hexo.log.error(tag, file);
      hexo.log.error(tag, e.message);
    }
  }
}

/**
 * get loaded post data (getter)
 * @returns
 */
export const getPostData = () => postData;

export function collectorPost(post: HexoLocalsData, hexo: Hexo) {
  // const cacheUnit = new persistentCache({
  //   base: path.join(hexo.base_dir, 'tmp/hexo-renderers'),
  //   name: 'collector',
  //   persist: true,
  //   memory: false
  // });
  const integrity = post.full_source ? md5FileSync(post.full_source) : md5(String(post.path + post.raw));
  /** existing post */
  const exPostIndex = postData.findIndex((exPost) => post.path === exPost.path);
  const exPost = postData.find((exPost) => post.path === exPost.path);
  // skip processing same integrity (it means unmodified)
  if (exPost && exPost.integrity === integrity) return;
  const isModified = exPost && exPost.integrity !== integrity;

  post.integrity = integrity;
  let description: string;
  // get description
  if (post.description && post.description !== '') {
    description = post.description;
    // description = util.replaceHTMLtoText(post.description).replace(/\%0D\%0A/g,'')
  } else if (post.excerpt && post.excerpt !== '') {
    description = post.excerpt;
    // description = util.replaceHTMLtoText(post.excerpt).replace(/\%0D\%0A/g,"")
  } else {
    description = String(post.title + post.content);
  }
  if (post.excerpt === '' || !post.excerpt) post.excerpt = description;
  if (post.description === '' || !post.description) post.description = description;
  // clean description
  post.excerpt = cleanText(post.excerpt);
  post.description = cleanText(post.description);

  // fix post thumbnail
  let img = '';
  if (post.thumbnail !== '') {
    img = post.thumbnail;
  } else if (post.cover) {
    img = post.cover;
  } else {
    const $ = cheerio.load(post.content);
    if ($('img') && $('img').length > 0) {
      $('img').each(function (i) {
        if (i == 0) {
          const imgsrc = $(this).attr('src');
          if (imgsrc) img = imgsrc;
        }
      });
    }
  }
  if (img !== '') {
    post.cover = img;
    post.thumbnail = img;
  }

  // delete unecessary property
  if ('config' in post) delete (post as DeepPartial<typeof post>).config;
  if ('site' in post) delete (post as DeepPartial<typeof post>).site;
  if ('posts' in post) delete (post as DeepPartial<typeof post>).posts;
  // simplify tags and categories (avoid circular references)
  if ('tags' in post) {
    const names = tagName(post.tags);
    delete (post as DeepPartial<typeof post>).tags;
    post.tags = names;
  }
  if ('categories' in post) {
    const names = categoriesName(post.categories);
    delete (post as DeepPartial<typeof post>).categories;
    post.categories = names;
  }

  if (!isModified) {
    postData.push(post);
  } else {
    // update post
    postData[exPostIndex] = post;
  }

  try {
    const map = postData.map((o) => {
      if ('config' in o) delete (o as DeepPartial<typeof o>).config;
      if ('site' in o) delete (o as DeepPartial<typeof o>).site;
      return o;
    });
    writefile(postDataFilePath(hexo), jsonStringifyWithCircularRefs(map));
  } catch (e: any) {
    hexo.log.error(logname, 'fail write postdata');
    console.trace(e);
  }
}

function cleanText(str: string) {
  return (
    String(str) // clean the invalid chars for html
      .replace(/[><"']/gm, '')
      // remove whitespaces with single space
      .replace(/\s+/g, ' ')
      // get first 200 characters
      .substring(0, 200)
  );
}
