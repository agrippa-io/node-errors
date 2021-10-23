"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorResourceAlreadyExists extends ErrorAPI_1.default {
    constructor(message = 'Resource Already Exists', data = {}) {
        super(`ErrorResourceAlreadyExists: ${message}`, 400);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorResourceAlreadyExists';
        this.prototype = ErrorAPI_1.default;
        this.data = data;
    }
}
exports.default = ErrorResourceAlreadyExists;
//# sourceMappingURL=ErrorResourceAlreadyExists.js.map