import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// src/renderer-sass.ts
import sass from "node-sass";
import path from "path";
var extend = Object.assign;
var sassRenderer = (ext) => function(data) {
  const userConfig = extend(this.theme.config.node_sass || {}, this.config.node_sass || {});
  const config = extend(
    {
      data: data.text,
      file: data.path,
      outputStyle: "nested",
      sourceComments: false,
      indentedSyntax: ext === "sass"
    },
    userConfig
  );
  if (typeof config.includePaths === "string") {
    config.includePaths = [config.includePaths];
  } else if (!config.includePaths) {
    config.includePaths = [];
  }
  config.includePaths.push(
    path.join(hexo.base_dir, "node_modules"),
    path.join(hexo.theme_dir, "node_modules")
  );
  try {
    const result = sass.renderSync(config);
    return Promise.resolve(result.css.toString());
  } catch (error) {
    console.error(error.toString());
    throw error;
  }
};
function rendererSass(hexo2) {
  hexo2.extend.renderer.register("scss", "css", sassRenderer("scss"));
  hexo2.extend.renderer.register("sass", "css", sassRenderer("sass"));
}

export {
  rendererSass
};
