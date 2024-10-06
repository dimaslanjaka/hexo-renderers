"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rendererDartSass = rendererDartSass;
var sass_1 = __importDefault(require("sass"));
/**
 * hexo-renderer-dartsass
 * @param hexo
 */
function rendererDartSass(hexo) {
    var make = function (data, _options) {
        var config = Object.assign(this.theme.config.sass || {}, this.config.sass || {}, { file: data.path });
        return new Promise(function (resolve, reject) {
            /*sass.render(config, (err, result) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(result.css.toString());
            });*/
            sass_1.default
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
