'use strict';

var ruler = require('./ruler.cjs');
var state_core = require('./rules_core/state_core.cjs');
var block = require('./rules_core/block.cjs');
var inline = require('./rules_core/inline.cjs');
var linkify = require('./rules_core/linkify.cjs');
var normalize = require('./rules_core/normalize.cjs');
var replacements = require('./rules_core/replacements.cjs');
var smartquotes = require('./rules_core/smartquotes.cjs');
var text_join = require('./rules_core/text_join.cjs');
var utils = require('./utils.cjs');

/** internal
 * class Core
 *
 * Top-level rules executor. Glues block/inline parsers and does intermediate
 * transformations.
 **/


const _rules = [
  ['normalize', normalize],
  ['block', block],
  ['inline', inline],
  ['linkify', linkify],
  ['replacements', replacements],
  ['smartquotes', smartquotes],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ['text_join', text_join]
];

/**
 * new Core()
 **/
class Core {
  State = state_core;

  constructor() {
    /**
     * Core#ruler -> Ruler
     *
     * [[Ruler]] instance. Keep configuration of core rules.
     **/
    this.ruler = new ruler();

    for (let i = 0; i < _rules.length; i++) {
      this.ruler.push(_rules[i][0], _rules[i][1]);
    }
  }
  /**
   * Core.process(state)
   *
   * Executes core chain rules.
   **/
  process(state) {
    const rules = this.ruler.getRules('');

    for (let i = 0, l = rules.length; i < l; i++) {
      utils.getRuleFunction(rules[i])(state);
    }
  }
}

Core.prototype.State = state_core;

module.exports = Core;
