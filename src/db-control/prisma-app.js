"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaApp = void 0;
var prisma_post_repo_1 = require("./prisma-post-repo");
var prisma_user_repo_1 = require("./prisma-user-repo");
var prisma_comment_repo_1 = require("./prisma-comment-repo");
var prisma_cookie_repo_1 = require("./prisma-cookie-repo");
var cookie_1 = require("../models/cookie");
var PrismaApp = /** @class */ (function () {
    function PrismaApp() {
        this.users = new prisma_user_repo_1.PrismaUserRepo();
        this.posts = new prisma_post_repo_1.PrismaPostRepo();
        this.comments = new prisma_comment_repo_1.PrismaCommentRepo();
        this.cookies = new prisma_cookie_repo_1.PrismaCookieRepo();
    }
    PrismaApp.prototype.authenticateUser = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.users.find(email)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, false];
                        if (user.password != password)
                            return [2 /*return*/, false];
                        if (user.password == password)
                            return [2 /*return*/, true];
                        return [2 /*return*/];
                }
            });
        });
    };
    PrismaApp.prototype.registerUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var addedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.users.add(user)];
                    case 1:
                        addedUser = _a.sent();
                        return [2 /*return*/, addedUser];
                }
            });
        });
    };
    PrismaApp.prototype.registerPost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var addedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.posts.add(post)];
                    case 1:
                        addedPost = _a.sent();
                        return [2 /*return*/, addedPost];
                }
            });
        });
    };
    PrismaApp.prototype.registerComment = function (comment) {
        return __awaiter(this, void 0, void 0, function () {
            var addedComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.comments.add(comment)];
                    case 1:
                        addedComment = _a.sent();
                        return [2 /*return*/, addedComment];
                }
            });
        });
    };
    PrismaApp.prototype.listUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.users.list()];
            });
        });
    };
    PrismaApp.prototype.listPosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.posts.list()];
            });
        });
    };
    PrismaApp.prototype.createCookie = function (email, sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var cookie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cookie = new cookie_1.Cookie(email, sessionId);
                        return [4 /*yield*/, this.cookies.add(cookie)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, cookie.sessionId];
                }
            });
        });
    };
    PrismaApp.prototype.verifyCookie = function (cookieId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cookies.verify(cookieId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PrismaApp.prototype.getCookie = function (cookieId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cookies.find(cookieId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PrismaApp;
}());
exports.PrismaApp = PrismaApp;
exports.default = new PrismaApp();
