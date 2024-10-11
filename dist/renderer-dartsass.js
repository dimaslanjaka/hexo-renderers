import sass from 'sass';
/**
 * hexo-renderer-dartsass
 * @param hexo
 */
export function rendererDartSass(hexo) {
    const make = function (data, _options) {
        const config = Object.assign(this.theme.config.sass || {}, this.config.sass || {}, { file: data.path });
        return new Promise((resolve, reject) => {
            /*sass.render(config, (err, result) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(result.css.toString());
            });*/
            sass
                .compileAsync(data.path, config)
                .then(function (result) {
                resolve(result.css);
            })
                .catch(reject);
        });
    };
    hexo.extend.renderer.register('scss', 'css', make);
    hexo.extend.renderer.register('sass', 'css', make);
}
