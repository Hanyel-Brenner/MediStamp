"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var Post = /** @class */ (function () {
    function Post(title, content, author) {
        this.id = '';
        this.title = '';
        this.content = '';
        this.title = title;
        this.content = content;
        this.author = author;
        this.date = new Date();
    }
    return Post;
}());
exports.Post = Post;
