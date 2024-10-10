import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const layout = 'layout.ejs';
const bodyTag = '</body>';
const mathjaxScript = fs.readFileSync(path.join(__dirname, 'mathjax.html'), 'utf-8');

/**
 * hexo-renderer-mathjax
 * @param hexo
 */
export function rendererMathjax(hexo: import('hexo')) {
  hexo.extend.renderer.register('ejs', 'html', function (data, options) {
    const path = (options.filename = data.path) as string;
    let content = data.text;
    if (layout === path.substring(path.length - layout.length)) {
      content = content.replace(bodyTag, mathjaxScript + '\n' + bodyTag);
    }
    return ejs.render(content, options, { async: true });
  });
}
