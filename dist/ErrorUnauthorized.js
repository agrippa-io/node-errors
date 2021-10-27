"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUnauthorized = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorUnauthorized extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Unauthorized', data = {}) {
        super(message, 401);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorUnauthorized';
        this.prototype = ErrorAPI_1.ErrorAPI;
        this.data = data;
    }
}
exports.ErrorUnauthorized = ErrorUnauthorized;
//# sourceMappingURL=ErrorUnauthorized.js.map