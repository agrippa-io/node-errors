"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorAPI_1 = __importDefault(require("./ErrorAPI"));
class ErrorIncompleteDataModification extends ErrorAPI_1.default {
    constructor(message) {
        super(`ErrorIncompleteDataModification: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorIncompleteDataModification';
        this.prototype = ErrorAPI_1.default;
    }
}
exports.default = ErrorIncompleteDataModification;
//# sourceMappingURL=ErrorIncompleteDataModification.js.map