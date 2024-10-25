import { load } from 'cheerio';
import Hexo from 'hexo';
import { escapeRegex, isValidHttpUrl, md5, persistentCache } from 'sbg-utility';
import path from 'upath';
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
export function htmlFixer(hexo: Hexo, html: string) {
  const cacheKey = md5(html);
  const cacheUnit = new persistentCache({
    base: path.join(hexo.base_dir, 'tmp/hexo-renderers'),
    name: 'markdown-it-renderer',
    persist: true,
    memory: false
  });

  const $ = load(html);
  const regexs: RegExp[] = [];
  $('*').each((index, element) => {
    const tagName = (element as any).tagName.toLowerCase();
    if (!resolveValidHtmlTags.bind(this.hexo)().includes(tagName)) {
      const regex = new RegExp('</?' + tagName + '>', 'gm');
      regexs.push(regex);
    } else if (tagName === 'img' || tagName === 'source' || tagName === 'iframe') {
      // Fix local post asset folder
      const src = $(element).attr('src');
      if (src && !isValidHttpUrl(src) && !src.startsWith(this.hexo.config.root) && !src.startsWith('//')) {
        const finalSrc = path.join(this.hexo.config.root, src);
        this.hexo.log.info('fix PAF', src, '->', finalSrc);
        const escaped = escapeRegex(src) as string;
        html = html.replace(new RegExp(escaped), finalSrc);
      }
    }
  });

  // Escape invalid html tags inside anchor

  const results = regexs.map((regex) => {
    const result = html.match(regex);
    if (typeof hexo != 'undefined') {
      this.hexo.log.warn('found invalid html tags inside anchor', regex, result);
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
