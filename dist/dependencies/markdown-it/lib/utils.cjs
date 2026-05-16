'use strict';

function getRuleFunction(rule) {
  if (typeof rule === 'function') return rule;
  if (rule && typeof rule === 'object' && typeof rule.fn === 'function') return rule.fn;
  console.error('rule is not function instead type of', typeof rule, rule);
}

exports.getRuleFunction = getRuleFunction;
