"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomGenerator = void 0;
var meta_1 = require("./meta");
function registerCustomGenerator(hexo, generators) {
    if ('meta' in generators)
        (0, meta_1.metaJsonCreator)(hexo);
}
exports.registerCustomGenerator = registerCustomGenerator;
