"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/markdown-it/html-tags.js
var html_tags_exports = {};
__export(html_tags_exports, {
  descriptionListTags: () => descriptionListTags,
  formAndInputTags: () => formAndInputTags,
  headAndMetadataTags: () => headAndMetadataTags,
  latexTags: () => latexTags,
  listTags: () => listTags,
  mathjaxTags: () => mathjaxTags,
  mediaTags: () => mediaTags,
  obsoleteTags: () => obsoleteTags,
  resolveValidHtmlTags: () => resolveValidHtmlTags,
  scriptAndInteractiveTags: () => scriptAndInteractiveTags,
  sectioningTags: () => sectioningTags,
  tableTags: () => tableTags,
  texTags: () => texTags,
  textContentTags: () => textContentTags,
  uncategorizedTags: () => uncategorizedTags,
  validHtmlTags: () => validHtmlTags,
  validHtmlTagsRegex: () => validHtmlTagsRegex
});
module.exports = __toCommonJS(html_tags_exports);
var import_sbg_utility = require("sbg-utility");
var headAndMetadataTags = ["base", "link", "meta", "style", "title", "head"];
var sectioningTags = ["article", "aside", "footer", "header", "main", "nav", "section", "body"];
var textContentTags = [
  "a",
  "abbr",
  "address",
  "b",
  "blockquote",
  "cite",
  "code",
  "del",
  "dfn",
  "em",
  "i",
  "ins",
  "kbd",
  "mark",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6"
];
var listTags = ["ul", "ol", "li"];
var descriptionListTags = ["dl", "dt", "dd"];
var formAndInputTags = [
  "button",
  "datalist",
  "fieldset",
  "form",
  "input",
  "label",
  "legend",
  "meter",
  "optgroup",
  "option",
  "output",
  "progress",
  "select",
  "textarea"
];
var tableTags = ["caption", "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr"];
var mediaTags = [
  "area",
  "audio",
  "img",
  "map",
  "track",
  "video",
  "source",
  "picture",
  "iframe",
  "svg",
  "embed",
  "object",
  "param",
  "path",
  "circle",
  "rect",
  "line",
  "polygon",
  "polyline",
  "g",
  "defs",
  "symbol",
  "use",
  "svg"
];
var scriptAndInteractiveTags = ["canvas", "noscript", "script", "dialog", "template", "slot"];
var obsoleteTags = [
  "acronym",
  "basefont",
  "big",
  "center",
  "dir",
  "font",
  "frame",
  "frameset",
  "isindex",
  "keygen",
  "menu",
  "noframes",
  "tt"
];
var uncategorizedTags = [
  "bdi",
  "br",
  "data",
  "details",
  "div",
  "dl",
  "dt",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "hr",
  "html",
  "legend",
  "li",
  "link",
  "main",
  "mark",
  "meta",
  "meter",
  "nav",
  "object",
  "ol",
  "param",
  "pre",
  "progress",
  "template",
  "textarea",
  "time",
  "track",
  "wbr"
];
var mathjaxTags = [
  "math",
  // Root element for MathML equations
  "mrow",
  // Grouping element for sub-expressions
  "mi",
  // Mathematical identifier (e.g., variables)
  "mn",
  // Mathematical number
  "mo",
  // Mathematical operator (e.g., +, -, =)
  "msup",
  // Superscript element (e.g., exponents like x^2)
  "msub",
  // Subscript element (e.g., x₁)
  "msubsup",
  // Subscript and superscript together (e.g., x₁²)
  "mfrac",
  // Fraction (e.g., \(\frac{a}{b}\))
  "mroot",
  // nth root (e.g., \(\sqrt[n]{x}\))
  "msqrt",
  // Square root (e.g., \(\sqrt{x}\))
  "munder",
  // Underscript (e.g., for limits below sum or integral)
  "mover",
  // Overscript (e.g., \(\overline{x}\))
  "munderover",
  // Both underscript and overscript (e.g., summation with limits)
  "mspace",
  // Spacer for adding extra space
  "mfenced",
  // Parentheses or brackets around an expression (e.g., \( (x+y) \))
  "mtable",
  // Table for matrices or arrays
  "mtr",
  // Table row (for matrices or arrays)
  "mtd",
  // Table cell (for matrices or arrays)
  "mlabeledtr",
  // Table row with labels
  "semantics",
  // Provides semantic meaning or alternative representations
  "annotation"
  // Adds metadata or alternative forms (like LaTeX annotations)
];
var texTags = [
  "mtext",
  // Plain text in a mathematical expression
  "mpadded",
  // Adds padding around elements for spacing
  "mstyle"
  // Applies styling to MathML elements (font size, color, etc.)
];
var latexTags = [
  "annotation",
  // Adds LaTeX annotations inside MathML
  "msup",
  // Superscript element (e.g., for exponents in LaTeX)
  "msub",
  // Subscript element (e.g., LaTeX-style subscript)
  "msubsup",
  // Combined subscript and superscript (used in LaTeX expressions)
  "mfrac",
  // LaTeX fraction (e.g., \(\frac{a}{b}\))
  "msqrt",
  // LaTeX square root (e.g., \(\sqrt{x}\))
  "mroot",
  // nth root in LaTeX (e.g., \(\sqrt[n]{x}\))
  "munder",
  // Underscript (used for limits or accents in LaTeX)
  "mover",
  // Overscript (e.g., \(\overline{x}\) in LaTeX)
  "munderover"
  // Combination of underscript and overscript (for summations, integrals)
];
var validHtmlTags = (0, import_sbg_utility.array_unique)([
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
var validHtmlTagsRegex = new RegExp("</?(" + validHtmlTags.join("|") + ")(\\s|>)");
function resolveValidHtmlTags() {
  const fromConfig = [];
  if (typeof hexo !== "undefined") {
    if (hexo.config.renderers) {
      const { html_tags = [] } = hexo.config.renderers;
      if (Array.isArray(html_tags)) fromConfig.push(...html_tags);
    }
  }
  return (0, import_sbg_utility.array_unique)(validHtmlTags.concat(fromConfig));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  descriptionListTags,
  formAndInputTags,
  headAndMetadataTags,
  latexTags,
  listTags,
  mathjaxTags,
  mediaTags,
  obsoleteTags,
  resolveValidHtmlTags,
  scriptAndInteractiveTags,
  sectioningTags,
  tableTags,
  texTags,
  textContentTags,
  uncategorizedTags,
  validHtmlTags,
  validHtmlTagsRegex
});
