"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResourceNotFound = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorResourceNotFound extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Resource not Found', data = {}) {
        super(`ErrorResourceNotFound: ${message}`, 404);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorResourceNotFound';
        this.prototype = ErrorAPI_1.ErrorAPI;
        this.data = data;
    }
}
exports.ErrorResourceNotFound = ErrorResourceNotFound;
//# sourceMappingURL=ErrorResourceNotFound.js.map