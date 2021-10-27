"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResourceAlreadyExists = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorResourceAlreadyExists extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Resource Already Exists', data = {}) {
        super(`ErrorResourceAlreadyExists: ${message}`, 400);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorResourceAlreadyExists';
        this.prototype = ErrorAPI_1.ErrorAPI;
        this.data = data;
    }
}
exports.ErrorResourceAlreadyExists = ErrorResourceAlreadyExists;
//# sourceMappingURL=ErrorResourceAlreadyExists.js.map