"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorMissingDependency extends ErrorAPI_1.default {
    constructor(message) {
        super(`ErrorMissingDependency: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorMissingDependency';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorMissingDependency;
//# sourceMappingURL=ErrorMissingDependency.js.map