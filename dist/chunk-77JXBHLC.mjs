import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __esm
} from "./chunk-QAIXVEL3.mjs";

// src/helper/getAuthor.ts
function getAuthor(hexo) {
  hexo.extend.helper.register("getAuthor", function getAuthor2(author, fallback) {
    if (!author) return fallback;
    const test1 = getTheAuthor(author);
    if (typeof test1 === "string") return test1;
    const test2 = getTheAuthor(this.config.author);
    if (typeof test2 === "string") return test2;
    return "default user";
  });
}
function getTheAuthor(authorObj) {
  if (typeof authorObj === "string") return authorObj;
  if (typeof authorObj.name === "string") return authorObj.name;
  if (typeof authorObj.nick === "string") return authorObj.nick;
  if (typeof authorObj.nickname === "string") return authorObj.nickname;
}
var init_getAuthor = __esm({
  "src/helper/getAuthor.ts"() {
  }
});

export {
  getAuthor,
  getTheAuthor,
  init_getAuthor
};
