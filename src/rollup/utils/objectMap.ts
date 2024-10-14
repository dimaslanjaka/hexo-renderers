'use strict';

function objectMap<T, R, U>(
  obj: Iterable<T> | ArrayLike<T> | Record<string, T>,
  callback: (this: U, value: T) => R,
  thisArg?: U
): R[] {
  if (obj == null) {
    throw new TypeError();
  }

  if (Array.isArray(obj)) {
    return obj.map(callback, thisArg);
  }

  const type = typeof obj;

  if (type !== 'object' && type !== 'string') {
    throw new TypeError('type is not object and not string');
  }

  // Check for iterable (including strings)
  if (typeof obj[Symbol.iterator] === 'function') {
    return Array.from(obj as Iterable<T>, callback, thisArg);
  }

  // Check for ArrayLike
  if (typeof (obj as ArrayLike<T>).length === 'number') {
    return Array.from(obj as ArrayLike<T>, callback, thisArg);
  }

  // Handle Record<string, T>
  return Object.values(obj).map(callback, thisArg);
}

export default objectMap;
