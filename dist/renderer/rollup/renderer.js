'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var rollup = require('rollup').rollup;
var HexoRollupConfigs = require('./HexoRollupConfigs').HexoRollupConfigs;
var objectWithoutKeys = require('./utils/objectWithoutKeys').objectWithoutKeys;
var _a = require('sbg-utility'), writefile = _a.writefile, jsonStringifyWithCircularRefs = _a.jsonStringifyWithCircularRefs;
var join = require('path').join;
/** @typedef {NodeJS.EventEmitter} Hexo */
/** @type {rollup.ModuleJSON[]} */
var rollupCache = [];
/**
 * @param {{ input: rollup.RollupFileOptions; output: rollup.OutputOptions; }} config
 * @return { Promise<string> }
 */
var rollupRenderAsync = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var bundle, code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config.input.cache = rollupCache;
                return [4 /*yield*/, rollup(config.input)];
            case 1:
                bundle = _a.sent();
                rollupCache = bundle.cache;
                return [4 /*yield*/, bundle.generate(config.output)];
            case 2:
                code = (_a.sent()).code;
                return [2 /*return*/, code];
        }
    });
}); };
module.exports.rollupRenderAsync = rollupRenderAsync;
/**
 * rollup renderer callback
 * @param {{text?:string,path?:string}} data
 * @param {import('rollup').RollupOptions} _options
 * @returns
 */
function renderer(data, _options) {
    return __awaiter(this, void 0, void 0, function () {
        var path, text, hexo, rollupConfigs, config, input, output, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = data.path, text = data.text;
                    hexo = this;
                    rollupConfigs = new HexoRollupConfigs(hexo);
                    config = rollupConfigs.merged();
                    if (config.experimentalCodeSplitting) {
                        throw new Error('hexo-renderer-rollup not Support "experimentalCodeSplitting".');
                    }
                    if (!config.input.includes(path)) {
                        return [2 /*return*/, text];
                    }
                    config.input = path;
                    input = objectWithoutKeys(config, ['output']);
                    output = config.output;
                    //hexo.log.info('rollup', { input, output, path });
                    writefile(join(hexo.base_dir, 'tmp/config/rollup.json'), jsonStringifyWithCircularRefs({ input: input, output: output, path: path }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, rollupRenderAsync({ input: input, output: output })];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_1 = _a.sent();
                    this.log.error(err_1);
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
module.exports = renderer;
