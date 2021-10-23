"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorMongoose extends ErrorAPI_1.default {
    constructor(message = 'Property is Read Only', data = {}) {
        super(`ErrorReadOnly: ${message}`, 422);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorReadOnly';
        this.prototype = ErrorAPI_1.default;
        this.data = data;
    }
}
exports.default = ErrorMongoose;
//# sourceMappingURL=ErrorReadOnly.js.map