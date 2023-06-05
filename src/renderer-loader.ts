import ansiColors from 'ansi-colors';
import { registerCustomGenerator } from './generator';
import { registerCustomHelper } from './helper';
import { rendererDartSass } from './renderer-dartsass';
import { rendererEjs } from './renderer-ejs';
import { default as rendererMarkdownIt } from './renderer-markdown-it';
import { rendererNunjucks } from './renderer-nunjucks';
import { rendererPug } from './renderer-pug';
import { rendererSass } from './renderer-sass';
import { rendererStylus } from './renderer-stylus';

const logname = ansiColors.magenta('hexo-renderers');

if (typeof hexo !== 'undefined') {
  // assign hexo to global variable
  (global as any).hexo = hexo;
  const options: { generator: string[]; engines: string[] } = Object.assign(
    { generator: ['meta'], engines: [] as string[] },
    hexo.config.renderers?.generator || {}
  );

  // shim v1 options
  if (Array.isArray(hexo.config.renderers)) {
    options.engines = hexo.config.renderers;
  }

  // register custom helper
  registerCustomHelper(hexo);
  // register custom generator
  registerCustomGenerator(hexo, options.generator);

  if (options.engines.length > 0) {
    // activate specific engine
    for (let i = 0; i < options.engines.length; i++) {
      const engine = options.engines[i];
      switch (engine) {
        case 'ejs':
          rendererEjs(hexo);
          break;
        case 'pug':
          rendererPug(hexo);
          break;
        case 'dartsass':
          rendererDartSass(hexo);
          break;
        case 'sass':
          rendererSass(hexo);
          break;
        case 'stylus':
          rendererStylus(hexo);
          break;
        case 'nunjucks':
        case 'njk':
          rendererNunjucks(hexo);
          break;
        case 'markdown-it':
          rendererMarkdownIt(hexo);
          break;
      }
    }
  } else {
    // activate all available engines
    rendererNunjucks(hexo);
    rendererEjs(hexo);
    rendererPug(hexo);
    rendererStylus(hexo);
    // rendererDartSass(hexo);
    rendererSass(hexo);
    rendererMarkdownIt(hexo);
  }
} else {
  console.error(logname, 'not hexo instance');
}
