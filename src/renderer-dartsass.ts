import Hexo from 'hexo';
import { StoreFunction } from 'hexo/dist/extend/renderer-d';
import sass from 'sass';

/**
 * hexo-renderer-dartsass
 * @param hexo
 */
export function rendererDartSass(hexo: Hexo) {
  const make = function (
    this: Hexo,
    data: Parameters<Parameters<Hexo['extend']['renderer']['register']>[2]>[0],
    _options: { [key: string]: any }
  ) {
    const config = Object.assign(this.theme.config.sass || {}, this.config.sass || {}, { file: data.path });

    return new Promise<string>((resolve, reject) => {
      /*sass.render(config, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result.css.toString());
      });*/
      sass
        .compileAsync(data.path as string, config)
        .then(function (result) {
          resolve(result.css);
        })
        .catch(reject);
    });
  };
  hexo.extend.renderer.register('scss', 'css', make as StoreFunction);
  hexo.extend.renderer.register('sass', 'css', make as StoreFunction);
}
