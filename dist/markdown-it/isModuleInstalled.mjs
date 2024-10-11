import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __require
} from "../chunk-LPG7NA4D.mjs";

// src/markdown-it/isModuleInstalled.js
import fs from "fs-extra";
function isModuleInstalled(packageName) {
  try {
    const modules = Array.from(process.moduleLoadList).filter((str) => !str.startsWith("NativeModule internal/"));
    return modules.indexOf(`NativeModule ${packageName}`) >= 0 || fs.existsSync(__require.resolve(packageName));
  } catch (_e) {
    return false;
  }
}
var isModuleInstalled_default = isModuleInstalled;
export {
  isModuleInstalled_default as default
};
