'use strict';

var ruler = require('./ruler.cjs');
var state_inline = require('./rules_inline/state_inline.cjs');
var text = require('./rules_inline/text.cjs');
var linkify = require('./rules_inline/linkify.cjs');
var newline = require('./rules_inline/newline.cjs');
var escape = require('./rules_inline/escape.cjs');
var backticks = require('./rules_inline/backticks.cjs');
var strikethrough = require('./rules_inline/strikethrough.cjs');
var emphasis = require('./rules_inline/emphasis.cjs');
var link = require('./rules_inline/link.cjs');
var image = require('./rules_inline/image.cjs');
var autolink = require('./rules_inline/autolink.cjs');
var html_inline = require('./rules_inline/html_inline.cjs');
var entity = require('./rules_inline/entity.cjs');
var balance_pairs = require('./rules_inline/balance_pairs.cjs');
var fragments_join = require('./rules_inline/fragments_join.cjs');
var utils = require('./utils.cjs');

/** internal
 * class ParserInline
 *
 * Tokenizes paragraph content.
 **/


// Parser rules

const _rules = [
  ['text', text],
  ['linkify', linkify],
  ['newline', newline],
  ['escape', escape],
  ['backticks', backticks],
  ['strikethrough', strikethrough.tokenize],
  ['emphasis', emphasis.tokenize],
  ['link', link],
  ['image', image],
  ['autolink', autolink],
  ['html_inline', html_inline],
  ['entity', entity]
];

// `rule2` ruleset was created specifically for emphasis/strikethrough
// post-processing and may be changed in the future.
//
// Don't use this for anything except pairs (plugins working with `balance_pairs`).
//
const _rules2 = [
  ['balance_pairs', balance_pairs],
  ['strikethrough', strikethrough.postProcess],
  ['emphasis', emphasis.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ['fragments_join', fragments_join]
];

/**
 * new ParserInline()
 **/
class ParserInline {
  State = state_inline;

  constructor() {
    /**
     * ParserInline#ruler -> Ruler
     *
     * [[Ruler]] instance. Keep configuration of inline rules.
     **/
    this.ruler = new ruler();

    for (let i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1]);
    }

    /**
     * ParserInline#ruler2 -> Ruler
     *
     * [[Ruler]] instance. Second ruler used for post-processing
     * (e.g. in emphasis-like rules).
     **/
    this.ruler2 = new ruler();

    for (let i = 0; i < _rules2.length; i++) {
      this.ruler2.push(_rules2[i][0], _rules2[i][1]);
    }
  }
  // Skip single token by running all rules in validation mode;
  // returns `true` if any rule reported success
  //
  skipToken(state) {
    const pos = state.pos;
    const rules = this.ruler.getRules('');
    const len = rules.length;
    const maxNesting = state.md.options.maxNesting;
    const cache = state.cache;

    if (typeof cache[pos] !== 'undefined') {
      state.pos = cache[pos];
      return;
    }

    let ok = false;

    if (state.level < maxNesting) {
      for (let i = 0; i < len; i++) {
        // Increment state.level and decrement it later to limit recursion.
        // It's harmless to do here, because no tokens are created. But ideally,
        // we'd need a separate private state variable for this purpose.
        //
        state.level++;
        ok = utils.getRuleFunction(rules[i])(state, true);
        state.level--;

        if (ok) {
          if (pos >= state.pos) {
            throw new Error("inline rule didn't increment state.pos");
          }
          break;
        }
      }
    } else {
      // Too much nesting, just skip until the end of the paragraph.
      //
      // NOTE: this will cause links to behave incorrectly in the following case,
      //       when an amount of `[` is exactly equal to `maxNesting + 1`:
      //
      //       [[[[[[[[[[[[[[[[[[[[[foo]()
      //
      // TODO: remove this workaround when CM standard will allow nested links
      //       (we can replace it by preventing links from being parsed in
      //       validation mode)
      //
      state.pos = state.posMax;
    }

    if (!ok) {
      state.pos++;
    }
    cache[pos] = state.pos;
  }
  // Generate tokens for input range
  //
  tokenize(state) {
    const rules = this.ruler.getRules('');
    const len = rules.length;
    const end = state.posMax;
    const maxNesting = state.md.options.maxNesting;

    while (state.pos < end) {
      // Try all possible rules.
      // On success, rule should:
      //
      // - update `state.pos`
      // - update `state.tokens`
      // - return true
      const prevPos = state.pos;
      let ok = false;

      if (state.level < maxNesting) {
        for (let i = 0; i < len; i++) {
          ok = utils.getRuleFunction(rules[i])(state, false);
          if (ok) {
            if (prevPos >= state.pos) {
              throw new Error("inline rule didn't increment state.pos");
            }
            break;
          }
        }
      }

      if (ok) {
        if (state.pos >= end) {
          break;
        }
        continue;
      }

      state.pending += state.src[state.pos++];
    }

    if (state.pending) {
      state.pushPending();
    }
  }
  /**
   * ParserInline.parse(str, md, env, outTokens)
   *
   * Process input string and push inline tokens into `outTokens`
   **/
  parse(str, md, env, outTokens) {
    const state = new this.State(str, md, env, outTokens);

    this.tokenize(state);

    const rules = this.ruler2.getRules('');
    const len = rules.length;

    for (let i = 0; i < len; i++) {
      utils.getRuleFunction(rules[i])(state);
    }
  }
}

ParserInline.prototype.State = state_inline;

module.exports = ParserInline;
