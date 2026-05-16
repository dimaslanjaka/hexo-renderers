import { __awaiter } from 'tslib';

function initCli(hexo) {
    hexo.extend.console.register('render-cache', 'Populate cache renderers', function (_args, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield hexo.load();
                // const posts = hexo.database.model('Post').find({ published: true }).toArray();
                // posts.forEach((post) => {
                //   console.log(post.full_source);
                // });
            }
            catch (error) {
                callback(error);
            }
        });
    });
}

export { initCli };
