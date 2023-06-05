export function getAuthor(hexo: import('hexo')) {
  /**
   * usage:
   * {{ getAuthor(page, 'default author') }}
   */
  hexo.extend.helper.register('getAuthor', function getAuthor(author, fallback) {
    if (!author) return fallback;
    const test1 = getTheAuthor(author);
    if (typeof test1 === 'string') return test1;
    const test2 = getTheAuthor(this.config.author);
    if (typeof test2 === 'string') return test2;
    return 'default user';
  });
}

export function getTheAuthor(authorObj: Record<string, any> | string) {
  if (typeof authorObj === 'string') return authorObj;
  if (typeof authorObj.name === 'string') return authorObj.name;
  if (typeof authorObj.nick === 'string') return authorObj.nick;
  if (typeof authorObj.nickname === 'string') return authorObj.nickname;
}
