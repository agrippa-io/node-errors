import { ErrorAPI } from './ErrorAPI';
export declare class ErrorBadRequest extends ErrorAPI {
    data: any;
    constructor(message?: string, data?: {});
}
