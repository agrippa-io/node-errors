"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorIncompleteDataModification = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorIncompleteDataModification extends ErrorAPI_1.ErrorAPI {
    constructor(message) {
        super(`ErrorIncompleteDataModification: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorIncompleteDataModification';
        this.prototype = ErrorAPI_1.ErrorAPI;
    }
}
exports.ErrorIncompleteDataModification = ErrorIncompleteDataModification;
//# sourceMappingURL=ErrorIncompleteDataModification.js.map