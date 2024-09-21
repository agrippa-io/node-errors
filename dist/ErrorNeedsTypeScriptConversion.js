import { ErrorAPI } from './ErrorAPI';
export class ErrorNeedsTypeScriptConversion extends ErrorAPI {
    constructor(message) {
        super(`ErrorNeedsTypeScriptConversion: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorNeedsTypeScriptConversion';
        this.prototype = ErrorAPI;
    }
}
//# sourceMappingURL=ErrorNeedsTypeScriptConversion.js.map