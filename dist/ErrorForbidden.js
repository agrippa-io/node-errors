"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorForbidden extends ErrorAPI_1.default {
    constructor(message = 'Forbidden') {
        super(message, 403);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorForbidden';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorForbidden;
//# sourceMappingURL=ErrorForbidden.js.map