'use strict';

/**
 * Class representing a Ruler.
 *
 * The Ruler is a helper class used by [[MarkdownIt#core]], [[MarkdownIt#block]], and
 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
 *
 * - Maintain rules in a defined order.
 * - Assign names to each rule.
 * - Enable/disable rules.
 * - Add/replace rules.
 * - Allow assignment of rules to additional named chains.
 * - Cache lists of active rules.
 *
 * You typically do not need to use this class directly unless writing plugins.
 * For simple rule control, use [[MarkdownIt.disable]], [[MarkdownIt.enable]], and
 * [[MarkdownIt.use]].
 */
class Ruler {
  /**
   * List of added rules.
   * Each element is an object with the following properties:
   * @type {Array<{
   *   name?: string,
   *   enabled?: boolean,
   *   fn: Function,
   *   alt?: string[]
   * }>}
   */
  __rules__ = [];

  /**
   * Cached rule chains.
   *
   * First level - chain name, '' for default.
   * Second level - digital anchor for fast filtering by charcodes.
   *
   * @type {Record<string, any>|null}
   */
  __cache__ = null;

  constructor() {
    //
  }
  // Helper methods, should not be used directly
  /**
   * Finds the index of a rule by its name.
   *
   * @param {string} name - The name of the rule to find.
   * @returns {number} The index of the rule, or -1 if not found.
   */
  __find__(name) {
    for (let i = 0; i < this.__rules__.length; i++) {
      if (this.__rules__[i].name === name) {
        return i;
      }
    }
    return -1;
  }
  /**
   * Builds a lookup cache for rules.
   */
  __compile__() {
    const self = this;
    const chains = [''];

    // Collect unique names
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) {
        return;
      }

      rule.alt.forEach(function (altName) {
        if (chains.indexOf(altName) < 0) {
          chains.push(altName);
        }
      });
    });

    self.__cache__ = {};

    chains.forEach(function (chain) {
      self.__cache__[chain] = [];
      self.__rules__.forEach(function (rule) {
        if (!rule.enabled) {
          return;
        }

        if (chain && rule.alt.indexOf(chain) < 0) {
          return;
        }

        self.__cache__[chain].push(rule.fn);
      });
    });
  }
  /**
   * Replaces a rule by its name with a new function and options.
   *
   * @param {string} name - The name of the rule to replace.
   * @param {(state: any) => void} fn - The new rule function.
   * @param {{ alt?: string[] }} [options] - Optional settings for the new rule.
   * @param {string[]} [options.alt] - An optional array of alternate chain names for the rule.
   * Use this property to specify alternative processing paths for the rule.
   *
   * @throws {Error} If the rule with the given `name` is not found.
   *
   * @example
   * const md = require('markdown-it')();
   * md.core.ruler.at('replacements', function replace(state) {
   *   // Rule logic here...
   * });
   */
  at(name, fn, options) {
    const index = this.__find__(name);
    const opt = options || {};

    if (index === -1) {
      throw new Error('Parser rule not found: ' + name);
    }

    this.__rules__[index].fn = fn;
    this.__rules__[index].alt = opt.alt || [];
    this.__cache__ = null;
  }
  /**
   * Adds a new rule before the specified existing rule.
   *
   * @param {string} beforeName - The name of the existing rule before which the new rule will be added.
   * @param {string} ruleName - The name of the new rule to be added.
   * @param {(state: any) => void} fn - The function that defines the behavior of the new rule.
   * @param {{ alt?: string[] }} [options] - Optional settings for the new rule.
   * @param {string[]} [options.alt] - An optional array of alternate chain names for the rule.
   * Use this property to specify alternative processing paths for the rule.
   *
   * @throws {Error} If the rule with the given `beforeName` is not found.
   *
   * @example
   * const md = require('markdown-it')();
   * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
   *   // Rule logic here...
   * });
   */
  before(beforeName, ruleName, fn, options) {
    const index = this.__find__(beforeName);
    const opt = options || {};

    if (index === -1) {
      throw new Error('Parser rule not found: ' + beforeName);
    }

    this.__rules__.splice(index, 0, {
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || []
    });

    this.__cache__ = null;
  }
  /**
   * Adds a new rule after the specified existing rule.
   *
   * @param {string} afterName - The name of the existing rule after which the new rule will be added.
   * @param {string} ruleName - The name of the new rule to be added.
   * @param {(state: any) => void} fn - The function that defines the behavior of the new rule.
   * @param {{ alt?: string[] }} [options] - Optional settings for the new rule.
   * @param {string[]} [options.alt] - An optional array of alternate chain names for the rule.
   * Use this property to specify alternative processing paths for the rule.
   *
   * @throws {Error} If the rule with the given `afterName` is not found.
   *
   * @example
   * const md = require('markdown-it')();
   * md.inline.ruler.after('text', 'my_rule', function replace(state) {
   *   // Rule logic here...
   * });
   */
  after(afterName, ruleName, fn, options) {
    const index = this.__find__(afterName);
    const opt = options || {};

    if (index === -1) {
      throw new Error('Parser rule not found: ' + afterName);
    }

    this.__rules__.splice(index + 1, 0, {
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || []
    });

    this.__cache__ = null;
  }
  /**
   * Pushes a new rule to the end of the chain.
   *
   * @param {string} ruleName - The name of the rule to be added.
   * @param {(state: any) => void} fn - The function that defines the behavior of the new rule.
   * @param {{ alt?: string[] }} [options] - Optional settings for the new rule.
   * @param {string[]} [options.alt] - An optional array of alternate chain names for the rule.
   * Use this property to specify alternative processing paths for the rule.
   *
   * @example
   * const md = require('markdown-it')();
   * md.core.ruler.push('my_rule', function replace(state) {
   *   // Rule logic here...
   * });
   */
  push(ruleName, fn, options) {
    const opt = options || {};

    this.__rules__.push({
      name: ruleName,
      enabled: true,
      fn,
      alt: opt.alt || []
    });

    this.__cache__ = null;
  }
  /**
   * Enables the specified rules by their names.
   *
   * @param {string|string[]} list - The name or array of rule names to enable.
   * @param {boolean} [ignoreInvalid=false] - If set to `true`, ignores errors when a rule is not found.
   *
   * Enables rules with the given names. If any rule name is not found, an error will be thrown unless `ignoreInvalid` is set to `true`.
   *
   * @returns {string[]} An array of the names of successfully enabled rules.
   *
   * @throws {Error} If a rule name is not found and `ignoreInvalid` is not set to `true`.
   *
   * @see [[Ruler.disable]], [[Ruler.enableOnly]]
   *
   * @example
   * const md = require('markdown-it')();
   * md.core.ruler.enable(['my_rule', 'another_rule'], true);
   */
  enable(list, ignoreInvalid) {
    if (!Array.isArray(list)) {
      list = [list];
    }

    const result = [];

    // Search by name and enable
    list.forEach(function (name) {
      const idx = this.__find__(name);

      if (idx < 0) {
        if (ignoreInvalid) {
          return;
        }
        throw new Error('Rules manager: invalid rule name ' + name);
      }
      this.__rules__[idx].enabled = true;
      result.push(name);
    }, this);

    this.__cache__ = null;
    return result;
  }
  /**
   * Enables only the specified rules by their names and disables all others.
   *
   * @param {string|string[]} list - The name or array of rule names to enable (whitelist).
   * @param {boolean} [ignoreInvalid=false] - If set to `true`, ignores errors when a rule is not found.
   *
   * Enables rules with the given names, and disables everything else. If any rule name is not found, an error will be thrown unless `ignoreInvalid` is set to `true`.
   *
   * @returns {string[]} An array of the names of successfully enabled rules.
   *
   * @throws {Error} If a rule name is not found and `ignoreInvalid` is not set to `true`.
   *
   * @see [[Ruler.disable]], [[Ruler.enable]]
   *
   * @example
   * const md = require('markdown-it')();
   * md.core.ruler.enableOnly('my_rule', true);
   */
  enableOnly(list, ignoreInvalid) {
    if (!Array.isArray(list)) {
      list = [list];
    }

    this.__rules__.forEach(function (rule) {
      rule.enabled = false;
    });

    return this.enable(list, ignoreInvalid);
  }
  /**
   * Disables the specified rules by their names.
   *
   * @param {string|string[]} list - The name or array of rule names to disable.
   * @param {boolean} [ignoreInvalid=false] - If set to `true`, ignores errors when a rule is not found.
   *
   * Disables rules with the given names. If any rule name is not found, an error will be thrown unless `ignoreInvalid` is set to `true`.
   *
   * @returns {string[]} An array of the names of successfully disabled rules.
   *
   * @throws {Error} If a rule name is not found and `ignoreInvalid` is not set to `true`.
   *
   * @see [[Ruler.enable]], [[Ruler.enableOnly]]
   *
   * @example
   * const md = require('markdown-it')();
   * md.core.ruler.disable(['my_rule', 'another_rule'], true);
   */
  disable(list, ignoreInvalid) {
    if (!Array.isArray(list)) {
      list = [list];
    }

    const result = [];

    // Search by name and disable
    list.forEach(function (name) {
      const idx = this.__find__(name);

      if (idx < 0) {
        if (ignoreInvalid) {
          return;
        }
        throw new Error('Rules manager: invalid rule name ' + name);
      }
      this.__rules__[idx].enabled = false;
      result.push(name);
    }, this);

    this.__cache__ = null;
    return result;
  }
  /**
   * Gets the list of currently enabled rules.
   *
   * @returns {string[]} An array of the names of enabled rules.
   *
   * @example
   * const md = require('markdown-it')();
   * const enabledRules = md.core.ruler.getEnabledRules();
   */
  getEnabledRules() {
    return this.__rules__
      .filter(function (rule) {
        return rule.enabled;
      })
      .map(function (rule) {
        return rule.name;
      });
  }
  /**
   * Gets the currently defined rules.
   *
   * @returns {Array} An array of the currently defined rules, including their names and enabled status.
   *
   * @example
   * const md = require('markdown-it')();
   * const rules = md.core.ruler.getRules();
   */
  getRules() {
    return this.__rules__;
  }
  /**
   * Clears the cache of the ruler.
   *
   * This method is used internally to clear the cache of active rules.
   */
  clearCache() {
    this.__cache__ = null;
  }
}

module.exports = Ruler;
