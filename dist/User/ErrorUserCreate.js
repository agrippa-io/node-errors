"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUserCreate = void 0;
const ErrorAPI_1 = require("../ErrorAPI");
class ErrorUserCreate extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Failed to create User') {
        super(`ErrorUserCreate: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorUserEmailCollision';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorUserCreate = ErrorUserCreate;
//# sourceMappingURL=ErrorUserCreate.js.map