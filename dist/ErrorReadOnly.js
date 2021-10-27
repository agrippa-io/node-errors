"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorMongoose extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Property is Read Only', data = {}) {
        super(`ErrorReadOnly: ${message}`, 422);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorReadOnly';
        this.prototype = ErrorAPI_1.ErrorAPI;
        this.data = data;
    }
}
exports.default = ErrorMongoose;
//# sourceMappingURL=ErrorReadOnly.js.map