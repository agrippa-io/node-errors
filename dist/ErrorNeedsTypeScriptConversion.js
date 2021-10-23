"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorNeedsTypeScriptConversion extends ErrorAPI_1.default {
    constructor(message) {
        super(`ErrorNeedsTypeScriptConversion: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorNeedsTypeScriptConversion';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorNeedsTypeScriptConversion;
//# sourceMappingURL=ErrorNeedsTypeScriptConversion.js.map