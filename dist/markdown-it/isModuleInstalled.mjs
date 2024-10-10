import { createRequire } from 'module'; const require = createRequire(import.meta.url);
import {
  __commonJS,
  __require
} from "../chunk-QAIXVEL3.mjs";

// src/markdown-it/isModuleInstalled.js
var require_isModuleInstalled = __commonJS({
  "src/markdown-it/isModuleInstalled.js"(exports, module) {
    function isModuleInstalled(packageName) {
      try {
        const modules = Array.from(process.moduleLoadList).filter((str) => !str.startsWith("NativeModule internal/"));
        return modules.indexOf(`NativeModule ${packageName}`) >= 0 || fs.existsSync(__require.resolve(packageName));
      } catch (e) {
        return false;
      }
    }
    module.exports = isModuleInstalled;
  }
});
export default require_isModuleInstalled();
