'use strict';

var token = require('../token.cjs');
var utils = require('../common/utils.cjs');

// Inline parser state


class StateInline {
  Token = token;

  constructor(src, md, env, outTokens) {
    this.src = src;
    this.env = env;
    this.md = md;
    this.tokens = outTokens;
    this.tokens_meta = Array(outTokens.length);

    this.pos = 0;
    this.posMax = this.src.length;
    this.level = 0;
    this.pending = '';
    this.pendingLevel = 0;

    // Stores { start: end } pairs. Useful for backtrack
    // optimization of pairs parse (emphasis, strikes).
    this.cache = {};

    // List of emphasis-like delimiters for current tag
    this.delimiters = [];

    // Stack of delimiter lists for upper level tags
    this._prev_delimiters = [];

    // backtick length => last seen position
    this.backticks = {};
    this.backticksScanned = false;

    // Counter used to disable inline linkify-it execution
    // inside <a> and markdown links
    this.linkLevel = 0;
  }
  // Flush pending text
  //
  pushPending() {
    const token$1 = new token('text', '', 0);
    token$1.content = this.pending;
    token$1.level = this.pendingLevel;
    this.tokens.push(token$1);
    this.pending = '';
    return token$1;
  }
  // Push new token to "stream".
  // If pending text exists - flush it as text token
  //
  push(type, tag, nesting) {
    if (this.pending) {
      this.pushPending();
    }

    const token$1 = new token(type, tag, nesting);
    let token_meta = null;

    if (nesting < 0) {
      // closing tag
      this.level--;
      this.delimiters = this._prev_delimiters.pop();
    }

    token$1.level = this.level;

    if (nesting > 0) {
      // opening tag
      this.level++;
      this._prev_delimiters.push(this.delimiters);
      this.delimiters = [];
      token_meta = { delimiters: this.delimiters };
    }

    this.pendingLevel = this.level;
    this.tokens.push(token$1);
    this.tokens_meta.push(token_meta);
    return token$1;
  }
  // Scan a sequence of emphasis-like markers, and determine whether
  // it can start an emphasis sequence or end an emphasis sequence.
  //
  //  - start - position to scan from (it should point at a valid marker);
  //  - canSplitWord - determine if these markers can be found inside a word
  //
  scanDelims(start, canSplitWord) {
    const max = this.posMax;
    const marker = this.src.charCodeAt(start);

    // treat beginning of the line as a whitespace
    const lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

    let pos = start;
    while (pos < max && this.src.charCodeAt(pos) === marker) {
      pos++;
    }

    const count = pos - start;

    // treat end of the line as a whitespace
    const nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

    const isLastPunctChar = utils.isMdAsciiPunct(lastChar) || utils.isPunctChar(String.fromCharCode(lastChar));
    const isNextPunctChar = utils.isMdAsciiPunct(nextChar) || utils.isPunctChar(String.fromCharCode(nextChar));

    const isLastWhiteSpace = utils.isWhiteSpace(lastChar);
    const isNextWhiteSpace = utils.isWhiteSpace(nextChar);

    const left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
    const right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);

    const can_open = left_flanking && (canSplitWord || !right_flanking || isLastPunctChar);
    const can_close = right_flanking && (canSplitWord || !left_flanking || isNextPunctChar);

    return { can_open, can_close, length: count };
  }
}

// re-export Token class to use in block rules
StateInline.prototype.Token = token;

module.exports = StateInline;
