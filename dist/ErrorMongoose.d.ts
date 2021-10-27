import { ErrorAPI } from './ErrorAPI';
export declare class ErrorMongoose extends ErrorAPI {
    data: any;
    constructor(message?: string, mongooseError?: any, data?: {});
}
