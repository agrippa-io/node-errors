"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMissingArgument = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorMissingArgument extends ErrorAPI_1.ErrorAPI {
    constructor(message) {
        super(`ErrorMissingArgument: ${message}`, 400);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorMissingArgument';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorMissingArgument = ErrorMissingArgument;
//# sourceMappingURL=ErrorMissingArgument.js.map