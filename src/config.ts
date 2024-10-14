import Hexo from 'hexo';

export interface RendererOptions {
  generator: string[];
  engines: string[];
  html_tags: string[];
}

export default function getRendererConfig(hexo: Hexo) {
  const options: RendererOptions = Object.assign(
    { generator: ['meta'], engines: [], html_tags: [] },
    hexo.config.renderers?.generator || {},
    hexo.config.renderers || {}
  );
  // shim v1 options
  if (Array.isArray(hexo.config.renderers)) {
    options.engines = hexo.config.renderers;
  }
  return options;
}
