"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInvalidData = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorInvalidData extends ErrorAPI_1.ErrorAPI {
    constructor(message, status = 422) {
        super(`ErrorInvalidData: ${message}`, status);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorInvalidData';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorInvalidData = ErrorInvalidData;
//# sourceMappingURL=ErrorInvalidData.js.map