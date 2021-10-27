"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUserEmailCollision = void 0;
const ErrorAPI_1 = require("../ErrorAPI");
class ErrorUserEmailCollision extends ErrorAPI_1.ErrorAPI {
    constructor(message) {
        super(`ErrorUserEmailCollision: ${message}`, 401);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorUserEmailCollision';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorUserEmailCollision = ErrorUserEmailCollision;
//# sourceMappingURL=ErrorUserEmailCollision.js.map