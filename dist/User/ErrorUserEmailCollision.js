"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("../ErrorAPI"));
class ErrorUserEmailCollision extends ErrorAPI_1.default {
    constructor(message) {
        super(`ErrorUserEmailCollision: ${message}`, 401);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorUserEmailCollision';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorUserEmailCollision;
//# sourceMappingURL=ErrorUserEmailCollision.js.map