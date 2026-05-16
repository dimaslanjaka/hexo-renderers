import Ruler from './ruler.js';
import StateBlock from './rules_block/state_block.js';
import table from './rules_block/table.js';
import code from './rules_block/code.js';
import fence from './rules_block/fence.js';
import blockquote from './rules_block/blockquote.js';
import hr from './rules_block/hr.js';
import list from './rules_block/list.js';
import reference from './rules_block/reference.js';
import html_block from './rules_block/html_block.js';
import heading from './rules_block/heading.js';
import lheading from './rules_block/lheading.js';
import paragraph from './rules_block/paragraph.js';
import { getRuleFunction } from './utils.js';

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
  State = StateBlock;

  constructor() {
    /**
     * ParserBlock#ruler -> Ruler
     *
     * [[Ruler]] instance. Keep configuration of block rules.
     **/
    this.ruler = new Ruler();

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
        ok = getRuleFunction(rules[i])(state, line, endLine, false);
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

ParserBlock.prototype.State = StateBlock;

export { ParserBlock as default };
