"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorJWTWhitelistMissing extends ErrorAPI_1.default {
    constructor(message = 'JWT Token missing from whitelist') {
        super(`ErrorJWTWhitelistMissing: ${message}`, 401);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorJWTWhitelistMissing';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorJWTWhitelistMissing;
//# sourceMappingURL=ErrorJWTWhitelistMissing.js.map