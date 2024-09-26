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
exports.App = void 0;
var posts_repo_1 = require("./posts-repo");
var user_repo_1 = require("./user-repo");
var user_already_registered_1 = require("../erros/user-already-registered");
var empty_post_1 = require("../erros/empty-post");
var comment_repo_1 = require("./comment-repo");
var empty_comment_1 = require("../erros/empty-comment");
var App = /** @class */ (function () {
    function App(user, post, comment) {
        this.postRepo = post;
        this.userRepo = user;
        this.commentRepo = comment;
    }
    App.prototype.registerUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.find(user.email)];
                    case 1:
                        if (_a.sent()) {
                            throw new user_already_registered_1.UserAlreadyRegistered();
                        }
                        return [4 /*yield*/, this.userRepo.add(user)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.registerPost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(post.content == '')) return [3 /*break*/, 1];
                        throw new empty_post_1.EmptyPost();
                    case 1: return [4 /*yield*/, this.postRepo.add(post)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.registerComment = function (comment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(comment.content == '')) return [3 /*break*/, 1];
                        throw new empty_comment_1.EmptyComment();
                    case 1: return [4 /*yield*/, this.commentRepo.add(comment)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.listUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.list()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.listPosts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postRepo.list()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.listComments = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentRepo.list()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return App;
}());
exports.App = App;
var app = new App(new user_repo_1.UserRepo(), new posts_repo_1.PostRepo(), new comment_repo_1.CommentRepo());
/*
(async () => {
    await app.registerUser(new User('redfield','redfield@mail.com','123'));
await app.registerUser(new User('hanyel','hanyel@mail.com','123'));
await app.registerUser(new User('daniel','daniel@mail.com','123'));
await app.registerUser(new User('pedro','pedro@mail.com','123'));
await app.registerUser(new User('corno','corno@hotmail.com','123'));
    })();


(async () => {
await app.registerPost('sharks','sharks are very interesting creatures', 'hanyel@mail.com');
await app.registerPost('dark souls 1 vs 2','dark souls 1 is way better of course', 'corno@hotmail.com');
await app.registerPost('????','noideia','daniel@mail.com');
})();

(async () => {
let post = await app.postRepo.find('sharks','hanyel@mail.com')
await app.registerComment(new Comment('I think sharks are stupid','corno@hotmail.com',post.id))
})();

//the following is test to see if we can find the registered user if we use the UserRepo.find() method
*/
//export {app};
