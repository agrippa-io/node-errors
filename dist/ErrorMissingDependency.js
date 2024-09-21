import { ErrorAPI } from './ErrorAPI';
export class ErrorMissingDependency extends ErrorAPI {
    constructor(message) {
        super(`ErrorMissingDependency: ${message}`);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorMissingDependency';
        this.prototype = ErrorAPI;
    }
}
//# sourceMappingURL=ErrorMissingDependency.js.map