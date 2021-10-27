"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMissingMongooseHookRegistration = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorMissingMongooseHookRegistration extends ErrorAPI_1.ErrorAPI {
    constructor(message) {
        super(`ErrorMissingMongooseHookRegistration: ${message}`, 400);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorMissingMongooseHookRegistration';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorMissingMongooseHookRegistration = ErrorMissingMongooseHookRegistration;
//# sourceMappingURL=ErrorMissingMongooseHookRegistration.js.map