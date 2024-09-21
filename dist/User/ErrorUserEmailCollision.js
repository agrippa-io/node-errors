import { ErrorAPI } from '../ErrorAPI';
export class ErrorUserEmailCollision extends ErrorAPI {
    constructor(message) {
        super(`ErrorUserEmailCollision: ${message}`, 401);
        Error.captureStackTrace(this, this.constructor);
        this.name = 'ErrorUserEmailCollision';
        this.prototype = ErrorAPI;
    }
}
//# sourceMappingURL=ErrorUserEmailCollision.js.map