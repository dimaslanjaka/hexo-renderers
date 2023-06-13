export = renderer;
/**
 * @param {object} _data
 * @param {string?} _data.path
 * @param {string?} _data.text
 * @returns {Promise<string>}
 */
declare function renderer({ path, text }: {
    path: string | null;
    text: string | null;
}): Promise<string>;
declare namespace renderer {
    export { Hexo };
}
type Hexo = NodeJS.EventEmitter;
