import { ErrorAPI } from './ErrorAPI';
export class ErrorBadRequest extends ErrorAPI {
    data;
    constructor(message = 'Bad Request', data = {}) {
        super(message, 400);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorBadRequest';
        this.prototype = ErrorAPI;
        this.data = data;
    }
}
//# sourceMappingURL=ErrorBadRequest.js.map