"use strict";
/**
 * check package installed
 * @param {string} packageName
 * @returns
 */
function isModuleInstalled(packageName) {
    try {
        var modules = Array.from(process.moduleLoadList).filter(function (str) { return !str.startsWith('NativeModule internal/'); });
        return modules.indexOf("NativeModule ".concat(packageName)) >= 0 || fs.existsSync(require.resolve(packageName));
    }
    catch (e) {
        return false;
    }
}
module.exports = isModuleInstalled;
