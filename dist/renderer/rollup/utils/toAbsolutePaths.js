'use strict';
import * as path from 'path';
import objectMap from './objectMap.js';
/**
 * @param {string|Iterable<string>|ArrayLike<string>|Object.<string, string>} targets
 * @param {string} base
 * @return {string|string[]}
 */
const toAbsolutePath = (targets, base) => {
    if (targets == null) {
        return [];
    }
    if (typeof targets === 'string') {
        if (path.isAbsolute(targets)) {
            return targets;
        }
        return path.join(base, targets);
    }
    // Convert config of the entry from object.
    return objectMap(targets, (x) => {
        return path.isAbsolute(x) ? x : path.join(base, x);
    });
};
export default toAbsolutePath;
