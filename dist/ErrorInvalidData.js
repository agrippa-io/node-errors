"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorInvalidData extends ErrorAPI_1.default {
    constructor(message, status = 422) {
        super(`ErrorInvalidData: ${message}`, status);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorInvalidData';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorInvalidData;
//# sourceMappingURL=ErrorInvalidData.js.map