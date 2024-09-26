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
exports.UserAlreadyRegistered = void 0;
var UserAlreadyRegistered = /** @class */ (function (_super) {
    __extends(UserAlreadyRegistered, _super);
    function UserAlreadyRegistered() {
        var _this = _super.call(this, 'User with same email has already been registered.') || this;
        _this.name = 'User Already Registered';
        return _this;
    }
    return UserAlreadyRegistered;
}(Error));
exports.UserAlreadyRegistered = UserAlreadyRegistered;
