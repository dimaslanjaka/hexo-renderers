import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// src/renderer-dartsass.ts
import sass from "sass";
function rendererDartSass(hexo) {
  const make = function(data, _options) {
    const config = Object.assign(this.theme.config.sass || {}, this.config.sass || {}, { file: data.path });
    return new Promise((resolve, reject) => {
      sass.compileAsync(data.path, config).then(function(result) {
        resolve(result.css);
      }).catch(reject);
    });
  };
  hexo.extend.renderer.register("scss", "css", make);
  hexo.extend.renderer.register("sass", "css", make);
}

export {
  rendererDartSass
};
