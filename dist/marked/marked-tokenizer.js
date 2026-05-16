import hexoUtil__default from 'hexo-util';
import { Tokenizer as y } from '../dependencies/marked/lib/marked.esm.js';

const { escapeHTML: escape } = hexoUtil__default;
// https://github.com/markedjs/marked/blob/b6773fca412c339e0cedd56b63f9fa1583cfd372/src/Lexer.js#L8-L24
const smartypants = (str, quotes) => {
    const [openDbl, closeDbl, openSgl, closeSgl] = typeof quotes === 'string' && quotes.length === 4 ? quotes : ['\u201c', '\u201d', '\u2018', '\u2019'];
    return (str
        // em-dashes
        .replace(/---/g, '\u2014')
        // en-dashes
        .replace(/--/g, '\u2013')
        // opening singles
        .replace(/(^|[-\u2014/([{"\s])'/g, '$1' + openSgl)
        // closing singles & apostrophes
        .replace(/'/g, closeSgl)
        // opening doubles
        .replace(/(^|[-\u2014/([{\u2018\s])"/g, '$1' + openDbl)
        // closing doubles
        .replace(/"/g, closeDbl)
        // ellipses
        .replace(/\.{3}/g, '\u2026'));
};
class MarkedTokenizer extends y {
    url(_src) {
        const { autolink } = this.options;
        console.log({ autolink });
        if (!autolink)
            return;
        // return undefined to use original url tokenizer
        return;
    }
    // Override smartypants
    inlineText(src) {
        const rules = this.rules;
        const { quotes, smartypants: isSmarty } = this.options;
        // https://github.com/markedjs/marked/blob/b6773fca412c339e0cedd56b63f9fa1583cfd372/src/Tokenizer.js#L643-L658
        const cap = rules.inline.text.exec(src);
        if (cap) {
            let text;
            if (this.lexer.state.inRawBlock || this.rules.inline.url.exec(src)) {
                text = cap[0];
            }
            else {
                text = escape(isSmarty ? smartypants(cap[0], quotes) : cap[0]);
            }
            return {
                type: 'text',
                raw: cap[0],
                text
            };
        }
    }
}

export { MarkedTokenizer };
