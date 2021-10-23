"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = __importDefault(require("@agrippa-io/node-utils/dist"));
class ErrorAPI extends Error {
    constructor(message, status = 500) {
        super();
        this.message = message;
        this.status = status;
        dist_1.default.error(this);
    }
}
exports.default = ErrorAPI;
//# sourceMappingURL=ErrorAPI.js.map