import ansiColors from 'ansi-colors';
import fs from 'fs-extra';

/**
 * Retrieves tag names from input data.
 *
 * @param inTags - The input tag data, can be an array or an object with a `data` property.
 * @returns An array of tag names.
 */
function tagName(inTags) {
    if (Array.isArray(inTags))
        return inTags;
    if (inTags === null || inTags === void 0 ? void 0 : inTags.data) {
        return inTags.data.map((item) => item.name);
    }
    return [];
}
ansiColors.magentaBright('hexo-renderers');
/**
 * check package installed
 * @param packageName
 * @returns
 */
function isPackageInstalled(packageName) {
    try {
        const modules = Array.from(process.moduleLoadList).filter((str) => !str.startsWith('NativeModule internal/'));
        return modules.indexOf(`NativeModule ${packageName}`) >= 0 || fs.existsSync(require.resolve(packageName));
    }
    catch (_e) {
        return false;
    }
}

export { isPackageInstalled, tagName };
