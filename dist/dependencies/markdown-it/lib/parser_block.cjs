'use strict';

var ruler = require('./ruler.cjs');
var state_block = require('./rules_block/state_block.cjs');
var table = require('./rules_block/table.cjs');
var code = require('./rules_block/code.cjs');
var fence = require('./rules_block/fence.cjs');
var blockquote = require('./rules_block/blockquote.cjs');
var hr = require('./rules_block/hr.cjs');
var list = require('./rules_block/list.cjs');
var reference = require('./rules_block/reference.cjs');
var html_block = require('./rules_block/html_block.cjs');
var heading = require('./rules_block/heading.cjs');
var lheading = require('./rules_block/lheading.cjs');
var paragraph = require('./rules_block/paragraph.cjs');
var utils = require('./utils.cjs');

/** internal
 * class ParserBlock
 *
 * Block-level tokenizer.
 **/


const _rules = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ['table', table, ['paragraph', 'reference']],
  ['code', code],
  ['fence', fence, ['paragraph', 'reference', 'blockquote', 'list']],
  ['blockquote', blockquote, ['paragraph', 'reference', 'blockquote', 'list']],
  ['hr', hr, ['paragraph', 'reference', 'blockquote', 'list']],
  ['list', list, ['paragraph', 'reference', 'blockquote']],
  ['reference', reference],
  ['html_block', html_block, ['paragraph', 'reference', 'blockquote']],
  ['heading', heading, ['paragraph', 'reference', 'blockquote']],
  ['lheading', lheading],
  ['paragraph', paragraph]
];

/**
 * new ParserBlock()
 **/
class ParserBlock {
  State = state_block;

  constructor() {
    /**
     * ParserBlock#ruler -> Ruler
     *
     * [[Ruler]] instance. Keep configuration of block rules.
     **/
    this.ruler = new ruler();

    for (let i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
    }
  }
  // Generate tokens for input range
  //
  tokenize(state, startLine, endLine) {
    const rules = this.ruler.getRules('');
    const len = rules.length;
    const maxNesting = state.md.options.maxNesting;
    let line = startLine;
    let hasEmptyLines = false;

    while (line < endLine) {
      state.line = line = state.skipEmptyLines(line);
      if (line >= endLine) {
        break;
      }

      // Termination condition for nested calls.
      // Nested calls currently used for blockquotes & lists
      if (state.sCount[line] < state.blkIndent) {
        break;
      }

      // If nesting level exceeded - skip tail to the end. That's not ordinary
      // situation and we should not care about content.
      if (state.level >= maxNesting) {
        state.line = endLine;
        break;
      }

      // Try all possible rules.
      // On success, rule should:
      //
      // - update `state.line`
      // - update `state.tokens`
      // - return true
      const prevLine = state.line;
      let ok = false;

      for (let i = 0; i < len; i++) {
        ok = utils.getRuleFunction(rules[i])(state, line, endLine, false);
        if (ok) {
          if (prevLine >= state.line) {
            throw new Error("block rule didn't increment state.line");
          }
          break;
        }
      }

      // this can only happen if user disables paragraph rule
      if (!ok) throw new Error('none of the block rules matched');

      // set state.tight if we had an empty line before current tag
      // i.e. latest empty line should not count
      state.tight = !hasEmptyLines;

      // paragraph might "eat" one newline after it in nested lists
      if (state.isEmpty(state.line - 1)) {
        hasEmptyLines = true;
      }

      line = state.line;

      if (line < endLine && state.isEmpty(line)) {
        hasEmptyLines = true;
        line++;
        state.line = line;
      }
    }
  }
  /**
   * ParserBlock.parse(str, md, env, outTokens)
   *
   * Process input string and push block tokens into `outTokens`
   **/
  parse(src, md, env, outTokens) {
    if (!src) {
      return;
    }

    const state = new this.State(src, md, env, outTokens);

    this.tokenize(state, state.line, state.lineMax);
  }
}

ParserBlock.prototype.State = state_block;

module.exports = ParserBlock;
