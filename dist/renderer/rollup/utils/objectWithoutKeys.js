'use strict';
/**
 * @param obj
 * @param keys
 */
export const objectWithoutKeys = (obj, keys) => {
    if (!Array.isArray(keys)) {
        throw new TypeError('keys most string[].');
    }
    return Object.keys(obj).reduce((newObject, key) => {
        if (!keys.includes(key))
            newObject[key] = obj[key];
        return newObject;
    }, {});
};
export default objectWithoutKeys;
