"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorResourceNotFound extends ErrorAPI_1.default {
    constructor(message = 'Resource not Found', data = {}) {
        super(`ErrorResourceNotFound: ${message}`, 404);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorResourceNotFound';
        this.prototype = ErrorAPI_1.default;
        this.data = data;
    }
}
exports.default = ErrorResourceNotFound;
//# sourceMappingURL=ErrorResourceNotFound.js.map