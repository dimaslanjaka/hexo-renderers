import fs from 'fs-extra';
import lodash from 'lodash';
import path from 'path';
import { jsonStringifyWithCircularRefs, slugify, writefile } from 'sbg-utility';
import { getPostData } from './collector';
import { tagName } from './util';

const assign = lodash.assign;

function addCount<T extends any[]>(array: T, searchProperty: string, newProperty: string) {
  return array.reduce(function (newArray, item) {
    const i = objectArrayIndexOf(newArray, item[searchProperty], searchProperty);
    if (i === -1) {
      item[newProperty] = 1;
      newArray.push(item);
    } else {
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
export function objectArrayIndexOf<T extends any[]>(array: T, searchTerm: string, property: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][property] === searchTerm) return i;
  }
  return -1;
}

function dynamicSort(property: string, isAscending: boolean) {
  let sortOrder = -1;
  if (isAscending) sortOrder = 1;
  return function (a: { [x: string]: any }, b: { [x: string]: any }) {
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

/**
 * generate random number
 * @see {@link https://stackoverflow.com/a/65638217/6404439}
 * @param n
 * @returns
 */
const rand = (n: number) => 0 | (Math.random() * n);

/**
 * fast shuffle array (internal)
 * @see {@link https://stackoverflow.com/a/65638217/6404439}
 * @param t
 */
function swap<T extends any[]>(t: T, i: number, j: number) {
  const q = t[i];
  t[i] = t[j];
  t[j] = q;
  return t;
}

/**
 * fast shuffle array
 * @see {@link https://stackoverflow.com/a/65638217/6404439}
 * @param t
 */
function shuffle<T extends any[]>(t: T) {
  let last = t.length;
  let n;
  while (last > 0) {
    n = rand(last);
    swap(t, n, --last);
  }
}

export function getRelatedPosts(hexo: import('hexo')) {
  hexo.extend.helper.register(
    'list_related_posts',
    function (options: {
      maxCount: number;
      /** 'date' | 'updated' */
      orderBy: string;
      isAscending?: any;
    }) {
      /** related post cache file */
      const relatedDb = path.join(hexo.base_dir, 'tmp/hexo-renderers', slugify(this.page.title), 'related.json');
      options = assign(
        {
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
        },
        options || {}
      );

      // fix descending
      const orderOption = ['date', 'random'];
      if (orderOption.indexOf(options.orderBy) === -1) {
        options.orderBy = 'date';
      }

      let postList = [] as any[];
      if (fs.existsSync(relatedDb)) {
        // load from cache
        postList = JSON.parse(fs.readFileSync(relatedDb, 'utf-8'));
      } else {
        // regenerate cache
        const post = this.post || this.page;
        if (post) {
          if ('tags' in post) {
            const tags = post.tags as Record<string, any>;
            if ('each' in tags) {
              tags.each(function (tag: Record<string, any>) {
                tag.posts.each(function (post: Record<string, any>) {
                  postList.push(post);
                });
              });
            }
          }
        }

        if (postList.length === 0) {
          const thisPageTags = this.page.tags || [];
          const postData = getPostData().filter((post) => {
            let tags: any[] = [];
            if (post.tags?.toArray) {
              tags = post.tags.toArray();
            } else if (post.tags) {
              tags = post.tags;
            }
            // fix post.tags is internal hexo class
            // get only array of string tags
            if (!tags.some) tags = tagName(tags);
            return tags.some((tag: any) => thisPageTags.includes(tag));
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
        const currentPostIndex = postList.findIndex(
          (post) => post._id === this.page._id || post.title === this.page.title
        );
        if (currentPostIndex !== -1) postList.splice(currentPostIndex, 1);

        if (options.orderBy === 'random') {
          shuffle(postList);
        } else {
          postList.sort(dynamicSort(options.orderBy, options.isAscending));
        }
        postList.sort(dynamicSort('count', false));

        writefile(relatedDb, jsonStringifyWithCircularRefs(postList));
      }

      return postList;
    }
  );
}
