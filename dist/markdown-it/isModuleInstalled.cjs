"use strict";

// src/markdown-it/isModuleInstalled.js
function isModuleInstalled(packageName) {
  try {
    const modules = Array.from(process.moduleLoadList).filter((str) => !str.startsWith("NativeModule internal/"));
    return modules.indexOf(`NativeModule ${packageName}`) >= 0 || fs.existsSync(require.resolve(packageName));
  } catch (e) {
    return false;
  }
}
module.exports = isModuleInstalled;
