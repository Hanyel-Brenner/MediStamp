"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
var Cookie = /** @class */ (function () {
    function Cookie(email, sessionId) {
        this.sessionId = sessionId;
        this.email = email;
        this.date = new Date();
    }
    return Cookie;
}());
exports.Cookie = Cookie;
