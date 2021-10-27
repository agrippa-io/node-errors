"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInvalidUploadStrategy = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorInvalidUploadStrategy extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Failed to upload due to invalid Upload Strategy') {
        super(`ErrorInvalidUploadStrategy: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorInvalidUploadStrategy';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorInvalidUploadStrategy = ErrorInvalidUploadStrategy;
//# sourceMappingURL=ErrorInvalidUploadStrategy.js.map