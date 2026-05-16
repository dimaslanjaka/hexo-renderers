import { isSpace } from '../common/utils.js';

// Process escaped chars and hardbreaks


const ESCAPED = [];

for (let i = 0; i < 256; i++) {
  ESCAPED.push(0);
}

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'.split('').forEach(function (ch) {
  ESCAPED[ch.charCodeAt(0)] = 1;
});

function escape(state, silent) {
  let pos = state.pos;
  const max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5c /* \ */) return false;
  pos++;

  // '\' at the end of the inline block
  if (pos >= max) return false;

  let ch1 = state.src.charCodeAt(pos);

  if (ch1 === 0x0a) {
    if (!silent) {
      state.push('hardbreak', 'br', 0);
    }

    pos++;
    // skip leading whitespaces from next line
    while (pos < max) {
      ch1 = state.src.charCodeAt(pos);
      if (!isSpace(ch1)) break;
      pos++;
    }

    state.pos = pos;
    return true;
  }

  let escapedStr = state.src[pos];

  if (ch1 >= 0xd800 && ch1 <= 0xdbff && pos + 1 < max) {
    const ch2 = state.src.charCodeAt(pos + 1);

    if (ch2 >= 0xdc00 && ch2 <= 0xdfff) {
      escapedStr += state.src[pos + 1];
      pos++;
    }
  }

  const origStr = '\\' + escapedStr;

  if (!silent) {
    const token = state.push('text_special', '', 0);

    if (ch1 < 256 && ESCAPED[ch1] !== 0) {
      token.content = escapedStr;
    } else {
      token.content = origStr;
    }

    token.markup = origStr;
    token.info = 'escape';
  }

  state.pos = pos + 1;
  return true;
}

export { escape as default };
