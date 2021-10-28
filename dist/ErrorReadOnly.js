"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorReadOnly = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorReadOnly extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Property is Read Only', data = {}) {
        super(`ErrorReadOnly: ${message}`, 422);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorReadOnly';
        this.prototype = ErrorAPI_1.ErrorAPI;
        this.data = data;
    }
}
exports.ErrorReadOnly = ErrorReadOnly;
//# sourceMappingURL=ErrorReadOnly.js.map