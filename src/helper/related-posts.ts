import Hexo from 'hexo';
import lodash from 'lodash';

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

function objectArrayIndexOf(array: any[], searchTerm: string, property: string) {
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

function shuffle<T extends any[]>(array: T) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export function listRelatedPosts(
  this: Hexo,
  options: {
    maxCount: number;
    /** 'date' | 'updated' */
    orderBy: string;
    isAscending?: any;
  }
) {
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
  const _post = this.post as Record<string, any>;
  if (typeof _post === 'object' && 'tags' in _post) {
    _post['tags'].each(function (tag: Record<string, any>) {
      tag.posts.each(function (post: Record<string, any>) {
        postList.push(post);
      });
    });
  } else {
    hexo.log.error('tags not found in _post', _post);
  }

  // sort post when post list not-empty
  if (postList.length > 0) {
    postList = addCount(postList, '_id', 'count');

    const thisPostPosition = objectArrayIndexOf(postList, _post._id, '_id');
    postList.splice(thisPostPosition, 1);

    if (options.orderBy === 'random') {
      postList = shuffle(postList);
    } else {
      postList = postList.sort(dynamicSort(options.orderBy, options.isAscending));
    }
    postList = postList.sort(dynamicSort('count', false));
  }

  return postList;
}

export function related_posts_helper(hexo: import('hexo')) {
  hexo.extend.helper.register('list_related_posts', listRelatedPosts);
}
