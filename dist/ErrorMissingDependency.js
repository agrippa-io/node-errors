"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMissingDependency = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorMissingDependency extends ErrorAPI_1.ErrorAPI {
    constructor(message) {
        super(`ErrorMissingDependency: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorMissingDependency';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorMissingDependency = ErrorMissingDependency;
//# sourceMappingURL=ErrorMissingDependency.js.map