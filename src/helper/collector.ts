import * as cheerio from 'cheerio';
import fs from 'fs-extra';
import Hexo from 'hexo';
import path from 'path';
import { file_to_hash, jsonStringifyWithCircularRefs, md5, writefile } from 'sbg-utility';
import { HexoLocalsData } from './hexoLocalData';

const postData: any[] = [];

export function postDataFilePath(hexo: Hexo) {
  return path.join(hexo.base_dir, 'tmp/post-data.json');
}

/**
 * load existing database
 */
export function loadPostData(hexo: Hexo) {
  const file = postDataFilePath(hexo);
  if (fs.existsSync(file)) {
    postData.push(...JSON.parse(fs.readFileSync(file, 'utf-8')));
  }
}

export async function collectorPost(post: HexoLocalsData, hexo: Hexo) {
  const integrity = post.full_source ? await file_to_hash('sha1', post.full_source, 'hex') : md5(post.path + post.raw);
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
  if (post.excerpt === '') post.excerpt = description;
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
  postData.push(post);

  writefile(postDataFilePath(hexo), jsonStringifyWithCircularRefs(postData));
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
