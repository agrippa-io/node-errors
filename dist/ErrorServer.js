"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorServer = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorServer extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Server Error', data = {}) {
        super(message, 500);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorServer';
        this.prototype = ErrorAPI_1.ErrorAPI;
        this.data = data;
    }
}
exports.ErrorServer = ErrorServer;
//# sourceMappingURL=ErrorServer.js.map