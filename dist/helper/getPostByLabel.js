"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByLabel = void 0;
function getPostByLabel(hexo) {
    hexo.extend.helper.register('getPostByLabel', 
    /**
     * hexo get post by key with name
     * @param by
     * @param filternames
     * @returns
     */
    function getPostByLabel(by, filternames) {
        var hexo = this;
        var data = hexo.site[by].data;
        if (Array.isArray(data)) {
            console.log(typeof data.filter);
            var map = filternames
                .map(function (filtername) {
                var filter = data.filter(function (_a) {
                    var name = _a.name;
                    return String(name).toLowerCase() == filtername.toLowerCase();
                });
                return filter.map(function (group) {
                    return group.posts.map(function (_a) {
                        var title = _a.title, permalink = _a.permalink, thumbnail = _a.thumbnail, photos = _a.photos;
                        // get title and permalink
                        // for more keys, you can look at https://github.com/dimaslanjaka/nodejs-package-types/blob/ec9b509d81eefdfada79f1658ac02118936a1e5a/index.d.ts#L757-L762
                        return { title: title, permalink: permalink, thumbnail: thumbnail, photos: photos };
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
    });
}
exports.getPostByLabel = getPostByLabel;
