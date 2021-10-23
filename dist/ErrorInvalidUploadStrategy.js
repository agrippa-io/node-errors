"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorInvalidUploadStrategy extends ErrorAPI_1.default {
    constructor(message = 'Failed to upload due to invalid Upload Strategy') {
        super(`ErrorInvalidUploadStrategy: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorInvalidUploadStrategy';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorInvalidUploadStrategy;
//# sourceMappingURL=ErrorInvalidUploadStrategy.js.map