"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorNeedsTypeScriptConversion = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorNeedsTypeScriptConversion extends ErrorAPI_1.ErrorAPI {
    constructor(message) {
        super(`ErrorNeedsTypeScriptConversion: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorNeedsTypeScriptConversion';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorNeedsTypeScriptConversion = ErrorNeedsTypeScriptConversion;
//# sourceMappingURL=ErrorNeedsTypeScriptConversion.js.map