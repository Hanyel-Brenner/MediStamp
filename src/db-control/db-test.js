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
var comment_1 = require("../models/comment");
var post_1 = require("../models/post");
var user_1 = require("../models/user");
var prisma_app_1 = require("./prisma-app");
//import prisma from './db'
var prisma = new prisma_app_1.PrismaApp();
//create user and then create post with that user as  author.
function userAndPost() {
    return __awaiter(this, void 0, void 0, function () {
        var addedUserId, _a, _b, _c, _d, userToAdd, addedPostId, _e, _f, foundUser, foundPost, addedCommentId, foundComment;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, prisma.registerUser(new user_1.User('hanyel', 'hanyel@mail', '123'))];
                case 1:
                    addedUserId = _g.sent();
                    console.log('Added user ID :' + addedUserId);
                    _b = (_a = console).log;
                    return [4 /*yield*/, prisma.users.find('hanyel@mail')];
                case 2:
                    _b.apply(_a, [_g.sent()]);
                    _d = (_c = console).log;
                    return [4 /*yield*/, prisma.users.find('hanyel@mail')];
                case 3:
                    _d.apply(_c, [(_g.sent()).id]);
                    return [4 /*yield*/, prisma.users.find('hanyel@mail')];
                case 4:
                    userToAdd = _g.sent();
                    return [4 /*yield*/, prisma.registerPost(new post_1.Post('Why I like coding in C', 'C is better than javascript', userToAdd))];
                case 5:
                    addedPostId = _g.sent();
                    console.log('Added post ID : ' + addedPostId);
                    _f = (_e = console).log;
                    return [4 /*yield*/, prisma.posts.find(addedPostId)];
                case 6:
                    _f.apply(_e, [_g.sent()]);
                    //create user with same email to see if duplicates are possible (they should'nt)
                    return [4 /*yield*/, prisma.registerUser(new user_1.User('daniel', 'hanyel@mail', '312'))];
                case 7:
                    //create user with same email to see if duplicates are possible (they should'nt)
                    _g.sent();
                    return [4 /*yield*/, prisma.registerUser(new user_1.User('daniel', 'daniel@mail', '1432'))];
                case 8:
                    _g.sent();
                    return [4 /*yield*/, prisma.users.find('hanyel@mail')];
                case 9:
                    foundUser = _g.sent();
                    return [4 /*yield*/, prisma.posts.find(addedPostId)]; //the found post is taken from the previous function
                case 10:
                    foundPost = _g.sent() //the found post is taken from the previous function
                    ;
                    return [4 /*yield*/, prisma.registerComment(new comment_1.Comment('ok but what even is ===', foundUser, foundPost))];
                case 11:
                    addedCommentId = _g.sent();
                    console.log('added comment ID : ' + addedCommentId);
                    return [4 /*yield*/, prisma.comments.find(addedCommentId)];
                case 12:
                    foundComment = _g.sent();
                    console.log(foundComment);
                    console.log('is author of added post correct?');
                    if (addedUserId == foundPost.author.id)
                        console.log(1 == 1);
                    else
                        console.log(1 != 1);
                    console.log('is author of added comment correct?');
                    if (addedUserId == foundComment.author.id)
                        console.log(1 == 1);
                    else
                        console.log(1 != 1);
                    console.log('is referenced post of added comment correct?');
                    if (addedPostId == foundComment.post.id)
                        console.log(1 == 1);
                    else
                        console.log(1 != 1);
                    return [2 /*return*/];
            }
        });
    });
}
userAndPost();
