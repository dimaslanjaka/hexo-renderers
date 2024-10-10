/**
 * hexo get post by key with name
 * @param by
 * @param filternames
 * @returns
 */
export function getPostByLabelInternal(by, filternames) {
    const hexo = this;
    const data = hexo.site[by].data;
    if (Array.isArray(data)) {
        console.log(typeof data.filter);
        const map = filternames
            .map((filtername) => {
            const filter = data.filter(({ name }) => String(name).toLowerCase() == filtername.toLowerCase());
            return filter.map((group) => {
                return group.posts.map(function ({ title, permalink, thumbnail, photos }) {
                    // get title and permalink
                    // for more keys, you can look at https://github.com/dimaslanjaka/nodejs-package-types/blob/ec9b509d81eefdfada79f1658ac02118936a1e5a/index.d.ts#L757-L762
                    return { title, permalink, thumbnail, photos };
                });
            });
        })
            // flattern all multidimensional arrays
            // to get array of hexo post object
            .flat(2);
        // dump
        // console.log(map);
        // return an JSON string
        // return JSON.stringify(map, null, 2);
        // return an Array
        return map;
    }
    return [];
}
export function getPostByLabel(hexo) {
    hexo.extend.helper.register('getPostByLabel', getPostByLabelInternal);
}
