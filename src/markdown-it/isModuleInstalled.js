import fs from 'fs-extra';

/**
 * check package installed
 * @param {string} packageName
 * @returns
 */
function isModuleInstalled(packageName) {
  try {
    const modules = Array.from(process.moduleLoadList).filter((str) => !str.startsWith('NativeModule internal/'));
    return modules.indexOf(`NativeModule ${packageName}`) >= 0 || fs.existsSync(require.resolve(packageName));
  } catch (_e) {
    return false;
  }
}

export default isModuleInstalled;
