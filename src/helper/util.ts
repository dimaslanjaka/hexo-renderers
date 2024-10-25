import ansiColors from 'ansi-colors';
import fs from 'fs-extra';

/**
 * Retrieves category names from input data.
 *
 * @param inCategories - The input category data, can be an array or an object with a `data` property.
 * @returns An array of category names or a formatted string of names if nested.
 */
export function categoriesName(inCategories: any) {
  if (!inCategories) return [];
  if (Array.isArray(inCategories)) return inCategories;
  if (inCategories?.data) {
    if (typeof inCategories.data[0] === 'string') return inCategories;
    return inCategories.data.map((item: any) => item.name).join(' > ');
  }
  return [];
}

/**
 * Retrieves tag names from input data.
 *
 * @param inTags - The input tag data, can be an array or an object with a `data` property.
 * @returns An array of tag names.
 */
export function tagName(inTags: any) {
  if (Array.isArray(inTags)) return inTags;
  if (inTags?.data) {
    return inTags.data.map((item: any) => item.name);
  }
  return [];
}

/** turn all type as partial recursively */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const logname = ansiColors.magentaBright('hexo-renderers');

/**
 * check package installed
 * @param packageName
 * @returns
 */
export function isPackageInstalled(packageName: string) {
  try {
    const modules = Array.from((process as any).moduleLoadList).filter(
      (str: any) => !str.startsWith('NativeModule internal/')
    );
    return modules.indexOf(`NativeModule ${packageName}`) >= 0 || fs.existsSync(require.resolve(packageName));
  } catch (_e) {
    return false;
  }
}
