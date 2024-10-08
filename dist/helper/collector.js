"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostData = void 0;
exports.postDataFilePath = postDataFilePath;
exports.loadPostData = loadPostData;
exports.collectorPost = collectorPost;
var cheerio = __importStar(require("cheerio"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var sbg_utility_1 = require("sbg-utility");
var util_1 = require("./util");
var postData = [];
/**
 * get post database path
 * @param hexo
 * @returns
 */
function postDataFilePath(hexo) {
    return path_1.default.join(hexo.base_dir, 'tmp/hexo-renderers/post-data.json');
}
/**
 * load existing database (initial only)
 */
function loadPostData(hexo) {
    var file = postDataFilePath(hexo);
    if (fs_extra_1.default.existsSync(file)) {
        // postData.push(...jsonParseWithCircularRefs(fs.readFileSync(file, 'utf-8')));
        try {
            postData = (0, sbg_utility_1.jsonParseWithCircularRefs)(fs_extra_1.default.readFileSync(file, 'utf-8'));
        }
        catch (e) {
            (0, sbg_utility_1.copyPath)(file, path_1.default.join(hexo.base_dir, 'tmp/hexo-renderers/errors/loadPostData.json'));
            var tag = 'fail load post data';
            hexo.log.error(tag, file);
            hexo.log.error(tag, e.message);
        }
    }
}
/**
 * get loaded post data (getter)
 * @returns
 */
var getPostData = function () { return postData; };
exports.getPostData = getPostData;
function collectorPost(post, hexo) {
    return __awaiter(this, void 0, void 0, function () {
        var integrity, _a, exPostIndex, exPost, isModified, description, img, $_1, names, names, map;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!post.full_source) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, sbg_utility_1.file_to_hash)('sha1', post.full_source, 'hex')];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = (0, sbg_utility_1.md5)(String(post.path + post.raw));
                    _b.label = 3;
                case 3:
                    integrity = _a;
                    exPostIndex = postData.findIndex(function (exPost) { return post.path === exPost.path; });
                    exPost = postData.find(function (exPost) { return post.path === exPost.path; });
                    // skip processing same integrity (it means unmodified)
                    if (exPost && exPost.integrity === integrity)
                        return [2 /*return*/];
                    isModified = exPost && exPost.integrity !== integrity;
                    post.integrity = integrity;
                    // get description
                    if (post.description && post.description !== '') {
                        description = post.description;
                        // description = util.replaceHTMLtoText(post.description).replace(/\%0D\%0A/g,'')
                    }
                    else if (post.excerpt && post.excerpt !== '') {
                        description = post.excerpt;
                        // description = util.replaceHTMLtoText(post.excerpt).replace(/\%0D\%0A/g,"")
                    }
                    else {
                        description = String(post.title + post.content);
                    }
                    if (post.excerpt === '' || !post.excerpt)
                        post.excerpt = description;
                    if (post.description === '' || !post.description)
                        post.description = description;
                    // clean description
                    post.excerpt = cleanText(post.excerpt);
                    post.description = cleanText(post.description);
                    img = '';
                    if (post.thumbnail !== '') {
                        img = post.thumbnail;
                    }
                    else if (post.cover) {
                        img = post.cover;
                    }
                    else {
                        $_1 = cheerio.load(post.content);
                        if ($_1('img') && $_1('img').length > 0) {
                            $_1('img').each(function (i) {
                                if (i == 0) {
                                    var imgsrc = $_1(this).attr('src');
                                    if (imgsrc)
                                        img = imgsrc;
                                }
                            });
                        }
                    }
                    if (img !== '') {
                        post.cover = img;
                        post.thumbnail = img;
                    }
                    // delete unecessary property
                    if ('config' in post)
                        delete post.config;
                    if ('site' in post)
                        delete post.site;
                    if ('posts' in post)
                        delete post.posts;
                    // simplify tags and categories (avoid circular references)
                    if ('tags' in post) {
                        names = (0, util_1.tagName)(post.tags);
                        delete post.tags;
                        post.tags = names;
                    }
                    if ('categories' in post) {
                        names = (0, util_1.categorieName)(post.categories);
                        delete post.categories;
                        post.categories = names;
                    }
                    if (!isModified) {
                        postData.push(post);
                    }
                    else {
                        // update post
                        postData[exPostIndex] = post;
                    }
                    try {
                        map = postData.map(function (o) {
                            if ('config' in o)
                                delete o.config;
                            if ('site' in o)
                                delete o.site;
                            return o;
                        });
                        (0, sbg_utility_1.writefile)(postDataFilePath(hexo), (0, sbg_utility_1.jsonStringifyWithCircularRefs)(map));
                    }
                    catch (e) {
                        hexo.log.error(util_1.logname, 'fail write postdata');
                        console.trace(e);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function cleanText(str) {
    return (String(str) // clean the invalid chars for html
        .replace(/[><"']/gm, '')
        // remove whitespaces with single space
        .replace(/\s+/g, ' ')
        // get first 200 characters
        .substring(0, 200));
}
