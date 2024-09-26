"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    //public post:Post[];
    function User(nickname, email, password) {
        this.id = '';
        this.nickname = '';
        this.email = '';
        this.password = '';
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }
    return User;
}());
exports.User = User;
