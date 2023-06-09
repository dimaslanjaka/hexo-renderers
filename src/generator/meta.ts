// forked from https://gist.github.com/mh61503891/544d3c1eefd00b1012463b860222d34f

const meta = {
  tags: [] as string[],
  posts: [] as Record<string, any>[],
  categories: [] as string[]
};

/**
 * create `meta.json` can be accessed at `http://example.com/meta.json`
 * @param hexo
 */
export function metaJsonCreator(hexo: import('hexo')) {
  hexo.extend.generator.register('meta', function (locals) {
    locals.tags.sort('name').each(function (tag: Record<string, any>) {
      if (!meta.tags.includes(tag.name)) meta.tags.push(tag.name);
    });
    locals.categories.sort('name').each(function (category: Record<string, any>) {
      if (!meta.categories.includes(category.name)) meta.categories.push(category.name);
    });
    locals.posts.sort('name').each(function (post: Record<string, any>) {
      meta.posts.push({
        title: post.title,
        url: encodeURI(post.permalink),
        // get modified date first
        date: post.updated.toDate().toISOString() || post.date.toDate().toISOString()
      });
    });
    return { path: 'meta.json', data: JSON.stringify(meta) };
  });
}
