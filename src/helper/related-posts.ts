import lodash from 'lodash';

const assign = lodash.assign

function addCount(array:any[], searchProperty: string, newProperty: string) {
  return array.reduce(function (newArray, item) {
    let i = objectArrayIndexOf(newArray, item[searchProperty], searchProperty);
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
  return function (a: { [x: string]: any; }, b: { [x: string]: any; }) {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
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

function listRelatedPosts(
  _post: { [key: string]: any; tags: { each: (arg0: (tag: any) => void) => void }; _id: any },
  options: { orderBy?: any; isAscending?: any },
  _hexo: any
) {
  if (!options) {
    options = {};
  }

  options = assign(
    {
      maxCount: 5,
      orderBy: 'date',
      isAscending: false
    },
    options
  );

  let orderOption = ['date', 'random'];
  if (orderOption.indexOf(options.orderBy) === -1) {
    options.orderBy = 'date';
  }

  let postList = [] as any[];
  // console.log(_post.tags);
  _post.tags.each(function (tag) {
    tag.posts.each(function (post: Record<string, any>) {
      postList.push(post);
    });
  });

  postList = addCount(postList, '_id', 'count');

  let thisPostPosition = objectArrayIndexOf(postList, _post._id, '_id');
  postList.splice(thisPostPosition, 1);

  if (options.orderBy === 'random') {
    shuffle(postList);
  } else {
    postList.sort(dynamicSort(options.orderBy, options.isAscending));
  }
  postList.sort(dynamicSort('count', false));

  return postList;
}

export function related_posts_helper(hexo: import('hexo')){
  hexo.extend.helper.register('list_related_posts', function (post, options, hexo) {
    return listRelatedPosts(post, options, hexo);
  });
}
