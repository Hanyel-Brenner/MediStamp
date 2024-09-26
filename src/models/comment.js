"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var Comment = /** @class */ (function () {
    function Comment(content, author, post) {
        this.id = '';
        this.content = '';
        this.content = content;
        this.author = author;
        this.post = post;
        this.date = new Date();
    }
    return Comment;
}());
exports.Comment = Comment;
