import sass from 'node-sass';
import path from 'path';
// import * as util from 'util';
const extend = Object.assign; //util['_extend'];
const sassRenderer = (ext) => function (data) {
    // support global and theme-specific config
    const userConfig = extend(this.theme.config.node_sass || {}, this.config.node_sass || {});
    const config = extend({
        data: data.text,
        file: data.path,
        outputStyle: 'nested',
        sourceComments: false,
        indentedSyntax: ext === 'sass'
    }, userConfig);
    // turn includePaths into array
    if (typeof config.includePaths === 'string') {
        // string
        config.includePaths = [config.includePaths];
    }
    else if (!config.includePaths) {
        // undefined
        config.includePaths = [];
    }
    // include installed library locations into compiler
    config.includePaths.push(path.join(hexo.base_dir, 'node_modules'), path.join(hexo.theme_dir, 'node_modules'));
    try {
        // node-sass result object:
        // https://github.com/sass/node-sass#result-object
        const result = sass.renderSync(config);
        // result is now Buffer instead of String
        // https://github.com/sass/node-sass/issues/711
        return Promise.resolve(result.css.toString());
    }
    catch (error) {
        console.error(error.toString());
        throw error;
    }
};
export function rendererSass(hexo) {
    // associate the Sass renderer with .scss AND .sass extensions
    hexo.extend.renderer.register('scss', 'css', sassRenderer('scss'));
    hexo.extend.renderer.register('sass', 'css', sassRenderer('sass'));
}
