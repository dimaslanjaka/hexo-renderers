import Hexo from 'hexo';

/**
 * get hexo renderers config (_config_yml.renderers)
 * @param hexo
 * @returns
 */
export default function getRendererConfig(hexo: Hexo) {
  const defaultOptions = {
    generator: ['meta'] as string[],
    engines: [] as string[],
    html_tags: [] as string[],
    fix: {
      html: false
    }
  };
  const options = Object.assign(defaultOptions, hexo.config.renderers?.generator || {}, hexo.config.renderers || {});
  // shim v1 options
  if (Array.isArray(hexo.config.renderers)) {
    options.engines = hexo.config.renderers;
  }
  return options as typeof defaultOptions;
}
