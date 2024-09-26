"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyPost = void 0;
var EmptyPost = /** @class */ (function (_super) {
    __extends(EmptyPost, _super);
    function EmptyPost() {
        var _this = _super.call(this, 'The content of the post is empty so it cannot be posted.') || this;
        _this.name = 'Empty post';
        return _this;
    }
    return EmptyPost;
}(Error));
exports.EmptyPost = EmptyPost;
