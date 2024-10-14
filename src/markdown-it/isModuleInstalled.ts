import fs from 'fs-extra';

/**
 * check package installed
 * @param packageName
 * @returns
 */
function isModuleInstalled(packageName: string) {
  try {
    const modules = Array.from((process as Record<string, any>).moduleLoadList).filter(
      (str: any) => typeof str === 'string' && !str.startsWith('NativeModule internal/')
    );
    return modules.indexOf(`NativeModule ${packageName}`) >= 0 || fs.existsSync(require.resolve(packageName));
  } catch (_e) {
    return false;
  }
}

export default isModuleInstalled;
