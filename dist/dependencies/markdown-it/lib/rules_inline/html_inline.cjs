'use strict';

var html_re = require('../common/html_re.cjs');

// Process html tags


function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}

function isLetter(ch) {
  /* eslint no-bitwise:0 */
  const lc = ch | 0x20; // to lower case
  return lc >= 0x61 /* a */ && lc <= 0x7a; /* z */
}

function html_inline(state, silent) {
  if (!state.md.options.html) {
    return false;
  }

  // Check start
  const max = state.posMax;
  const pos = state.pos;
  if (state.src.charCodeAt(pos) !== 0x3c /* < */ || pos + 2 >= max) {
    return false;
  }

  // Quick fail on second char
  const ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21 /* ! */ && ch !== 0x3f /* ? */ && ch !== 0x2f /* / */ && !isLetter(ch)) {
    return false;
  }

  const match = state.src.slice(pos).match(html_re.HTML_TAG_RE);
  if (!match) {
    return false;
  }

  if (!silent) {
    const token = state.push('html_inline', '', 0);
    token.content = match[0];

    if (isLinkOpen(token.content)) state.linkLevel++;
    if (isLinkClose(token.content)) state.linkLevel--;
  }
  state.pos += match[0].length;
  return true;
}

module.exports = html_inline;
