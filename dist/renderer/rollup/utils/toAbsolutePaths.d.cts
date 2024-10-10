/**
 * @param {string|Iterable<string>|ArrayLike<string>|Object.<string, string>} targets
 * @param {string} base
 * @return {string|string[]}
 */
declare function toAbsolutePath(targets: string | Iterable<string> | ArrayLike<string> | {
    [x: string]: string;
}, base: string): string | string[];

export { toAbsolutePath as default };
