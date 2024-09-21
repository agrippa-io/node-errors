import { ErrorAPI } from './ErrorAPI';
export class ErrorResourceNotFound extends ErrorAPI {
    data;
    constructor(message = 'Resource not Found', data = {}) {
        super(`ErrorResourceNotFound: ${message}`, 404);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorResourceNotFound';
        this.prototype = ErrorAPI;
        this.data = data;
    }
}
//# sourceMappingURL=ErrorResourceNotFound.js.map