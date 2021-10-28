import { ErrorAPI } from './ErrorAPI';
export declare class ErrorReadOnly extends ErrorAPI {
    data: any;
    constructor(message?: string, data?: {});
}
