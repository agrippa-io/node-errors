"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMongoose = void 0;
const ErrorAPI_1 = require("./ErrorAPI");
class ErrorMongoose extends ErrorAPI_1.ErrorAPI {
    constructor(message = 'Bad Request', mongooseError = null, data = {}) {
        super(generateEdisenMongooseErrorMessage(message, mongooseError), 422);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorBadRequest';
        this.prototype = ErrorAPI_1.ErrorAPI;
        this.data = data;
    }
}
exports.ErrorMongoose = ErrorMongoose;
function generateEdisenMongooseErrorMessage(message, error) {
    var _a, _b, _c;
    switch (error.name) {
        case 'ValidationError':
            const secondaryMessage = Object.keys(error.errors)
                .map((errKey) => {
                var _a, _b, _c;
                const err = error.errors[errKey];
                const props = err === null || err === void 0 ? void 0 : err.properties;
                return `['${(_a = err === null || err === void 0 ? void 0 : err.path) !== null && _a !== void 0 ? _a : 'unknown'}'] - ${(_c = (_b = err === null || err === void 0 ? void 0 : err.reason) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : `Invalid value${(props === null || props === void 0 ? void 0 : props.value) && ` '${props === null || props === void 0 ? void 0 : props.value}'`}`}`;
            })
                .join(', ');
            return `ErrorBadRequest: ${message} - ValidationErrors: ${secondaryMessage}`;
        case 'CastError':
            return `ErrorBadRequest: ${message} - Query Argument['${(_a = error === null || error === void 0 ? void 0 : error.path) !== null && _a !== void 0 ? _a : 'unknown'}'] - ${(_c = (_b = error === null || error === void 0 ? void 0 : error.reason) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : 'Invalid'}`;
        default:
            return `Unhandled Mongoose Error: ${error.name}`;
    }
}
//# sourceMappingURL=ErrorMongoose.js.map