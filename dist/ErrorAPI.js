import { Logger } from '@agrippa-io/node-utils';
export class ErrorAPI extends Error {
    // Class Properties
    status;
    message;
    prototype;
    constructor(message, status = 500) {
        super();
        this.message = message;
        this.status = status;
        Logger.error(this);
    }
}
//# sourceMappingURL=ErrorAPI.js.map