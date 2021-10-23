"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorBadRequest extends ErrorAPI_1.default {
    constructor(message = 'Server Error', data = {}) {
        super(message, 500);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorServer';
        this.prototype = ErrorAPI_1.default;
        this.data = data;
    }
}
exports.default = ErrorBadRequest;
//# sourceMappingURL=ErrorServer.js.map