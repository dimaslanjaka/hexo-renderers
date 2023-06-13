'use strict';
/**
 * @param {object} obj
 * @param {string[]} keys
 */
var objectWithoutKeys = function (obj, keys) {
    if (!Array.isArray(keys)) {
        throw new TypeError('keys most string[].');
    }
    return Object.keys(obj).reduce(function (newObject, key) {
        if (!keys.includes(key))
            newObject[key] = obj[key];
        return newObject;
    }, {});
};
module.exports = objectWithoutKeys;
