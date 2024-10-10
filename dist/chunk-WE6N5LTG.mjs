import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  objectMap_default
} from "./chunk-Y4EE73PS.mjs";

// src/renderer/rollup/utils/toAbsolutePaths.js
import * as path from "path";
var toAbsolutePath = (targets, base) => {
  if (targets == null) {
    return [];
  }
  if (typeof targets === "string") {
    if (path.isAbsolute(targets)) {
      return targets;
    }
    return path.join(base, targets);
  }
  return objectMap_default(targets, (x) => {
    return path.isAbsolute(x) ? x : path.join(base, x);
  });
};
var toAbsolutePaths_default = toAbsolutePath;

export {
  toAbsolutePaths_default
};
