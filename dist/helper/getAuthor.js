"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthor = getAuthor;
exports.getTheAuthor = getTheAuthor;
function getAuthor(hexo) {
    /**
     * usage:
     * {{ getAuthor(page, 'default author') }}
     */
    hexo.extend.helper.register('getAuthor', function getAuthor(author, fallback) {
        if (!author)
            return fallback;
        var test1 = getTheAuthor(author);
        if (typeof test1 === 'string')
            return test1;
        var test2 = getTheAuthor(this.config.author);
        if (typeof test2 === 'string')
            return test2;
        return 'default user';
    });
}
function getTheAuthor(authorObj) {
    if (typeof authorObj === 'string')
        return authorObj;
    if (typeof authorObj.name === 'string')
        return authorObj.name;
    if (typeof authorObj.nick === 'string')
        return authorObj.nick;
    if (typeof authorObj.nickname === 'string')
        return authorObj.nickname;
}
