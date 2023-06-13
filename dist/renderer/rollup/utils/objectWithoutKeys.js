'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectWithoutKeys = void 0;
/**
 * @param obj
 * @param keys
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
exports.objectWithoutKeys = objectWithoutKeys;
module.exports = exports.objectWithoutKeys;
