"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorJWTWhitelistMissing = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorJWTWhitelistMissing extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'JWT Token missing from whitelist') {
        super(`ErrorJWTWhitelistMissing: ${message}`, 401);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorJWTWhitelistMissing';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorJWTWhitelistMissing = ErrorJWTWhitelistMissing;
//# sourceMappingURL=ErrorJWTWhitelistMissing.js.map