"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorForbidden = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorForbidden extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Forbidden') {
        super(message, 403);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorForbidden';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorForbidden = ErrorForbidden;
//# sourceMappingURL=ErrorForbidden.js.map