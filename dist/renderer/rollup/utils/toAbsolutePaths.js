'use strict';
var _a = require('path'), join = _a.join, isAbsolute = _a.isAbsolute;
var objectMap = require('./objectMap');
/**
 * @param {string|Iterable<string>|ArrayLike<string>|Object.<string, string>} targets
 * @param {string} base
 * @return {string|string[]}
 */
var toAbsolutePath = function (targets, base) {
    if (targets == null) {
        return [];
    }
    if (typeof targets === 'string') {
        if (isAbsolute(targets)) {
            return targets;
        }
        return join(base, targets);
    }
    // Convert config of the entry from object.
    return objectMap(targets, function (x) {
        return isAbsolute(x) ? x : join(base, x);
    });
};
module.exports = toAbsolutePath;
