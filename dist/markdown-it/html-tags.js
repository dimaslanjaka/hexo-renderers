import Hexo from 'hexo';
import { array_unique } from 'sbg-utility';
import getRendererConfig from '../config.js';

const headAndMetadataTags = ['base', 'link', 'meta', 'style', 'title', 'head'];
const sectioningTags = ['article', 'aside', 'footer', 'header', 'main', 'nav', 'section', 'body'];
const textContentTags = [
    'a',
    'abbr',
    'address',
    'b',
    'blockquote',
    'cite',
    'code',
    'del',
    'dfn',
    'em',
    'i',
    'ins',
    'kbd',
    'mark',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'small',
    'span',
    'strong',
    'strike',
    'sub',
    'sup',
    'time',
    'u',
    'var',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6'
];
const listTags = ['ul', 'ol', 'li'];
const descriptionListTags = ['dl', 'dt', 'dd'];
const formAndInputTags = [
    'button',
    'datalist',
    'fieldset',
    'form',
    'input',
    'label',
    'legend',
    'meter',
    'optgroup',
    'option',
    'output',
    'progress',
    'select',
    'textarea'
];
const tableTags = ['caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'];
const mediaTags = [
    'area',
    'audio',
    'img',
    'map',
    'track',
    'video',
    'source',
    'picture',
    'iframe',
    'svg',
    'embed',
    'object',
    'param',
    'path',
    'circle',
    'rect',
    'line',
    'polygon',
    'polyline',
    'g',
    'defs',
    'symbol',
    'use',
    'svg'
];
const scriptAndInteractiveTags = ['canvas', 'noscript', 'script', 'dialog', 'template', 'slot'];
const obsoleteTags = [
    'acronym',
    'basefont',
    'big',
    'center',
    'dir',
    'font',
    'frame',
    'frameset',
    'isindex',
    'keygen',
    'menu',
    'noframes',
    'tt'
];
// Tags from defaultHtmlTags that don't fit into the above categories
const uncategorizedTags = [
    'bdi',
    'br',
    'data',
    'details',
    'div',
    'dl',
    'dt',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'hr',
    'html',
    'legend',
    'li',
    'link',
    'main',
    'mark',
    'meta',
    'meter',
    'nav',
    'object',
    'ol',
    'param',
    'pre',
    'progress',
    'template',
    'textarea',
    'time',
    'track',
    'wbr'
];
// MathJax-specific tags (MathML elements used by MathJax for rendering)
const mathjaxTags = [
    'math', // Root element for MathML equations
    'mrow', // Grouping element for sub-expressions
    'mi', // Mathematical identifier (e.g., variables)
    'mn', // Mathematical number
    'mo', // Mathematical operator (e.g., +, -, =)
    'msup', // Superscript element (e.g., exponents like x^2)
    'msub', // Subscript element (e.g., x₁)
    'msubsup', // Subscript and superscript together (e.g., x₁²)
    'mfrac', // Fraction (e.g., \(\frac{a}{b}\))
    'mroot', // nth root (e.g., \(\sqrt[n]{x}\))
    'msqrt', // Square root (e.g., \(\sqrt{x}\))
    'munder', // Underscript (e.g., for limits below sum or integral)
    'mover', // Overscript (e.g., \(\overline{x}\))
    'munderover', // Both underscript and overscript (e.g., summation with limits)
    'mspace', // Spacer for adding extra space
    'mfenced', // Parentheses or brackets around an expression (e.g., \( (x+y) \))
    'mtable', // Table for matrices or arrays
    'mtr', // Table row (for matrices or arrays)
    'mtd', // Table cell (for matrices or arrays)
    'mlabeledtr', // Table row with labels
    'semantics', // Provides semantic meaning or alternative representations
    'annotation' // Adds metadata or alternative forms (like LaTeX annotations)
];
// Tex-related tags (for adding or formatting plain text in a math environment)
const texTags = [
    'mtext', // Plain text in a mathematical expression
    'mpadded', // Adds padding around elements for spacing
    'mstyle' // Applies styling to MathML elements (font size, color, etc.)
];
// LaTeX-related tags (used for LaTeX-style annotations or styling)
const latexTags = [
    'annotation', // Adds LaTeX annotations inside MathML
    'msup', // Superscript element (e.g., for exponents in LaTeX)
    'msub', // Subscript element (e.g., LaTeX-style subscript)
    'msubsup', // Combined subscript and superscript (used in LaTeX expressions)
    'mfrac', // LaTeX fraction (e.g., \(\frac{a}{b}\))
    'msqrt', // LaTeX square root (e.g., \(\sqrt{x}\))
    'mroot', // nth root in LaTeX (e.g., \(\sqrt[n]{x}\))
    'munder', // Underscript (used for limits or accents in LaTeX)
    'mover', // Overscript (e.g., \(\overline{x}\) in LaTeX)
    'munderover' // Combination of underscript and overscript (for summations, integrals)
];
const validHtmlTags = array_unique([
    ...headAndMetadataTags,
    ...sectioningTags,
    ...textContentTags,
    ...formAndInputTags,
    ...tableTags,
    ...mediaTags,
    ...scriptAndInteractiveTags,
    ...obsoleteTags,
    ...uncategorizedTags,
    ...texTags,
    ...mathjaxTags,
    ...latexTags,
    ...descriptionListTags,
    ...listTags
]);
new RegExp('</?(' + validHtmlTags.join('|') + ')(\\s|>)');
function resolveValidHtmlTags() {
    const fromConfig = [];
    const instance = this instanceof Hexo ? this : hexo;
    if (typeof instance !== 'undefined') {
        const config = getRendererConfig(instance);
        if ('html_tags' in config) {
            const html_tags = config.html_tags;
            if (Array.isArray(html_tags))
                fromConfig.push(...html_tags);
        }
    }
    return array_unique(validHtmlTags.concat(fromConfig));
}

export { descriptionListTags, formAndInputTags, headAndMetadataTags, latexTags, listTags, mathjaxTags, mediaTags, obsoleteTags, resolveValidHtmlTags, scriptAndInteractiveTags, sectioningTags, tableTags, texTags, textContentTags, uncategorizedTags, validHtmlTags };
