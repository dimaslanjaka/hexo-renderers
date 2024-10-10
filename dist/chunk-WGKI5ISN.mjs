import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// src/generator/meta.ts
var meta = {
  tags: [],
  posts: [],
  categories: []
};
function metaJsonCreator(hexo) {
  hexo.extend.generator.register("meta", function(locals) {
    locals.tags.sort("name").each(function(tag) {
      if (!meta.tags.includes(tag.name)) meta.tags.push(tag.name);
    });
    locals.categories.sort("name").each(function(category) {
      if (!meta.categories.includes(category.name)) meta.categories.push(category.name);
    });
    locals.posts.sort("name").each(function(post) {
      meta.posts.push({
        title: post.title,
        url: encodeURI(post.permalink),
        // get modified date first
        date: post.updated.toDate().toISOString() || post.date.toDate().toISOString()
      });
    });
    return { path: "meta.json", data: JSON.stringify(meta) };
  });
}

export {
  metaJsonCreator
};
