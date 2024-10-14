'use strict';

import * as path from 'path';
import objectMap from './objectMap.js';

/**
 * Converts relative paths to absolute paths based on a given base path.
 *
 * @param targets - The targets to convert. This can be a string, an iterable of strings,
 *                  an array-like object of strings, or an object with string keys and values.
 * @param base - The base path to resolve against.
 * @returns The absolute path as a string if a single target is provided,
 *          or an array of absolute paths if multiple targets are provided.
 */
function toAbsolutePath(
  targets: string | Iterable<string> | ArrayLike<string> | Record<string, string>,
  base: string
): string | string[] {
  if (targets == null) {
    return [];
  }

  if (typeof targets === 'string') {
    if (path.isAbsolute(targets)) {
      return targets;
    }
    return path.join(base, targets);
  }

  // Convert each target to its absolute path.
  return objectMap(targets, (x: string) => {
    return path.isAbsolute(x) ? x : path.join(base, x);
  });
}

export default toAbsolutePath;
