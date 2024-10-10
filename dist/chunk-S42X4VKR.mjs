import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __esm
} from "./chunk-QAIXVEL3.mjs";

// src/helper/getPostByLabel.ts
function getPostByLabelInternal(by, filternames) {
  const hexo = this;
  const data = hexo.site[by].data;
  if (Array.isArray(data)) {
    console.log(typeof data.filter);
    const map = filternames.map((filtername) => {
      const filter = data.filter(({ name }) => String(name).toLowerCase() == filtername.toLowerCase());
      return filter.map((group) => {
        return group.posts.map(function({ title, permalink, thumbnail, photos }) {
          return { title, permalink, thumbnail, photos };
        });
      });
    }).flat(2);
    return map;
  }
  return [];
}
function getPostByLabel(hexo) {
  hexo.extend.helper.register("getPostByLabel", getPostByLabelInternal);
}
var init_getPostByLabel = __esm({
  "src/helper/getPostByLabel.ts"() {
  }
});

export {
  getPostByLabelInternal,
  getPostByLabel,
  init_getPostByLabel
};
