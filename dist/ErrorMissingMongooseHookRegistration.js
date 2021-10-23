"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorMissingMongooseHookRegistration extends ErrorAPI_1.default {
    constructor(message) {
        super(`ErrorMissingMongooseHookRegistration: ${message}`, 400);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorMissingMongooseHookRegistration';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorMissingMongooseHookRegistration;
//# sourceMappingURL=ErrorMissingMongooseHookRegistration.js.map