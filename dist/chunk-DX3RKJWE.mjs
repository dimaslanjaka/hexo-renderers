import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __esm
} from "./chunk-QAIXVEL3.mjs";

// src/helper/util.ts
import ansiColors from "ansi-colors";
var categorieName, tagName, logname;
var init_util = __esm({
  "src/helper/util.ts"() {
    categorieName = (inCategories) => {
      if (!inCategories) return [];
      if (typeof inCategories.data[0] === "string") return inCategories;
      let catName = "";
      for (let r = 0; r < inCategories.data.length; r++) {
        if (catName != "") catName += " > ";
        catName += inCategories.data[r].name;
      }
      return catName;
    };
    tagName = (inTags) => {
      if (!inTags || !Array.isArray(inTags.data)) return [];
      if (typeof inTags.data[0] === "string") return inTags;
      const retTags = [];
      inTags.data.forEach((item) => {
        retTags.push(item.name);
      });
      return retTags;
    };
    logname = ansiColors.magentaBright("hexo-renderers");
  }
});

export {
  categorieName,
  tagName,
  logname,
  init_util
};
