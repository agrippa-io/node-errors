"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorMissingArgument extends ErrorAPI_1.default {
    constructor(message) {
        super(`ErrorMissingArgument: ${message}`, 400);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorMissingArgument';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorMissingArgument;
//# sourceMappingURL=ErrorMissingArgument.js.map