"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAPI = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
class ErrorAPI extends Error {
    // Class Properties
    status;
    message;
    prototype;
    constructor(message, status = 500) {
        super();
        this.message = message;
        this.status = status;
        node_utils_1.Logger.error(this);
    }
}
exports.ErrorAPI = ErrorAPI;
