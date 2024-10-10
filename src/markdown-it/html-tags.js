export const headAndMetadataTags = ['base', 'link', 'meta', 'style', 'title', 'head'];

export const sectioningTags = ['article', 'aside', 'footer', 'header', 'main', 'nav', 'section'];

export const textContentTags = [
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

export const formAndInputTags = [
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

export const tableTags = ['caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'];

export const mediaTags = ['area', 'audio', 'img', 'map', 'track', 'video', 'source', 'picture', 'iframe'];

export const scriptAndInteractiveTags = ['canvas', 'noscript', 'script', 'dialog', 'template', 'slot'];

export const obsoleteTags = [
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
export const uncategorizedTags = [
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

export const katexHtmlTags = [
  'semantics',
  'mrow',
  'mspace',
  'mi',
  'mi',
  'mi',
  'mi',
  'mrow',
  'mn',
  'mi',
  'mo',
  'mn',
  'mrow',
  'mo',
  'mo',
  'mn',
  'mo',
  'mi',
  'msup',
  'mo',
  'mn',
  'msup',
  'mrow',
  'annotation',
  'semantics',
  'math'
];

export const validHtmlTags = [
  ...headAndMetadataTags,
  ...sectioningTags,
  ...textContentTags,
  ...formAndInputTags,
  ...tableTags,
  ...mediaTags,
  ...scriptAndInteractiveTags,
  ...obsoleteTags,
  ...uncategorizedTags,
  ...katexHtmlTags
].filter((value, index, self) => {
  return self.indexOf(value) === index;
});

export const validHtmlTagsRegex = new RegExp('</?(' + validHtmlTags.join('|') + ')(\\s|>)');
