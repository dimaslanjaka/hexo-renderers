const stylus = require('stylus');

function getProperty(obj, name) {
  name = name.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');

  const split = name.split('.');
  let key = split.shift();

  if (!Object.prototype.hasOwnProperty.call(obj, key)) return '';

  let result = obj[key];
  const len = split.length;

  if (!len) {
    if (result === 0) return result;
    return result || '';
  }
  if (typeof result !== 'object') return '';

  for (let i = 0; i < len; i++) {
    key = split[i];
    if (!Object.prototype.hasOwnProperty.call(result, key)) return '';

    result = result[split[i]];
    if (typeof result !== 'object') return result;
  }

  return result;
}

function applyPlugins(stylusConfig, plugins) {
  plugins.forEach((plugin) => {
    const factoryFn = require(plugin.trim());
    stylusConfig.use(factoryFn());
  });
}

/**
 * @param {import('hexo/dist/extend/renderer-d').StoreFunctionData} data
 * @param {Record<string, any>} options
 * @param {(err: Error|undefined|null, result: string)=>any} callback
 */
function stylusFn(data, options, callback) {
  /**
   * @type {import('hexo')}
   */
  let self = this;
  // if (typeof self === 'undefined') self = hexo;
  const config = self.config.stylus || {};
  const plugins = ['nib'].concat(config.plugins || []);

  function defineConfig(style) {
    style.define('hexo-config', (data) => {
      return getProperty(self.theme.config, data.val);
    });
  }

  const stylusConfig = stylus(data.text);

  applyPlugins(stylusConfig, plugins);

  stylusConfig
    .use(defineConfig)
    .use((style) => self.execFilterSync('stylus:renderer', style, { context: this }))
    .set('filename', data.path)
    .set('sourcemap', config.sourcemaps)
    .set('compress', config.compress)
    .set('include css', true)
    .render(callback);
}

stylusFn.disableNunjucks = true;

/**
 * hexo-renderer-stylus
 * @param {import('hexo')} hexo
 */
function rendererStylus(hexo) {
  hexo.extend.renderer.register('styl', 'css', stylusFn);
  hexo.extend.renderer.register('stylus', 'css', stylusFn);
}

module.exports = { rendererStylus, stylusFn };
