import Hexo from 'hexo';

export function initCli(hexo: Hexo) {
  hexo.extend.console.register(
    'render-cache',
    'Populate cache renderers',
    async function (this: Hexo, _args, callback) {
      try {
        await hexo.load();
        // const posts = hexo.database.model('Post').find({ published: true }).toArray();
        // posts.forEach((post) => {
        //   console.log(post.full_source);
        // });
      } catch (error) {
        callback(error);
      }
    }
  );
}
