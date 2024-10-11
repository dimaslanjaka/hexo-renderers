/**
 * @template T
 * @template R
 * @template U
 * @param {Iterable<T>|ArrayLike<T>|Object.<string, T>} obj
 * @param {(this: U, value: T) => R} callback
 * @param {U} thisArg
 * @return {R[]}
 */
declare function objectMap<T, R, U>(obj: Iterable<T> | ArrayLike<T> | {
    [x: string]: T;
}, callback: (this: U, value: T) => R, thisArg?: U): R[];

export { objectMap as default };
