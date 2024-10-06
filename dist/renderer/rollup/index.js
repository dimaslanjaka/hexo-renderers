'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rendererRollup = rendererRollup;
var renderer_1 = __importDefault(require("./renderer"));
function rendererRollup(hexo) {
    hexo.extend.renderer.register('js', 'js', renderer_1.default);
    hexo.extend.renderer.register('mjs', 'js', renderer_1.default);
}
