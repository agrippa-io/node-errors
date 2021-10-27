"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBadRequest = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorBadRequest extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Bad Request', data = {}) {
        super(message, 400);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorBadRequest';
        this.prototype = ErrorAPI_1.ErrorAPI;
        this.data = data;
    }
}
exports.ErrorBadRequest = ErrorBadRequest;
//# sourceMappingURL=ErrorBadRequest.js.map