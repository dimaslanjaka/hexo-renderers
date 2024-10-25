import { load } from 'cheerio';
import Hexo from 'hexo';
import { escapeRegex, isValidHttpUrl, md5, persistentCache } from 'sbg-utility';
import path from 'upath';
import { HexoLocalsData } from '../helper/hexoLocalsData';
import { resolveValidHtmlTags } from '../markdown-it/html-tags';

export const escapeHtml = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Fix generated html
 * @param html
 * @returns
 */
export function htmlFixer(this: Hexo, html: string, _data: HexoLocalsData) {
  const hexo = this;
  const cacheKey = md5(html);
  const cacheUnit = new persistentCache({
    base: path.join(hexo.base_dir, 'tmp/hexo-renderers'),
    name: 'markdown-it-renderer',
    persist: true,
    memory: false
  });

  const $ = load(html);

  // Fix local post asset folder
  const tagsHasSelector = [
    'img[src]',
    'script[src]',
    'iframe[src]',
    'audio[src]',
    'video[src]',
    'source[src]',
    'track[src]',
    'embed[src]'
  ];
  // Iterate over each selector and find matching elements
  tagsHasSelector.forEach((selector) => {
    $(selector).each((index, element) => {
      let src = $(element).attr('src');
      if (src) {
        // prefix with http
        if (src.startsWith('//')) {
          src = 'http://' + src;
        }
        // skip /node_modules transformation
        if (src.startsWith('/node_modules')) return;
        if (!isValidHttpUrl(src) && !src.startsWith(hexo.config.root)) {
          hexo.log.info(`${selector} found with invalid http src: ${src}`);
          const finalSrc = path.join(hexo.config.root, src);
          hexo.log.info(`fix PAF for selector (${selector})`, src, '->', finalSrc);
          const escaped = escapeRegex(src) as string;
          html = html.replace(new RegExp(escaped), finalSrc);
        }
      }
    });
  });

  const anchorInvalidHtmlTags: { regex: RegExp; tagName: string }[] = [];
  $('a').each((_index, element) => {
    const tagName = (element as any).tagName.toLowerCase();
    if (!resolveValidHtmlTags.bind(hexo)().includes(tagName)) {
      const regex = new RegExp('</?' + escapeRegex(tagName) + '>', 'gm');
      anchorInvalidHtmlTags.push({ regex, tagName });
    }
  });

  // Escape invalid html tags inside anchor

  const results = anchorInvalidHtmlTags.map(({ regex }) => {
    const result = html.match(regex);
    if (typeof hexo != 'undefined') {
      hexo.log.warn('found invalid html tags inside anchor', regex, result);
    }
    return { regex, result };
  });
  // Flatten the results and filter out null values
  const matches = results.flat();
  for (let i = 0; i < matches.length; i++) {
    const regex_result = matches[i];
    if (regex_result.result) {
      for (let i = 0; i < regex_result.result.length; i++) {
        const replacement = escapeHtml(regex_result.result[i]);
        // console.log(regex_result.regex, replacement);
        html = html.replace(regex_result.regex, replacement);
      }
    }
  }
  cacheUnit.set(cacheKey, html);
  return html;
}
