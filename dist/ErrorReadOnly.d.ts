import ErrorAPI from './ErrorAPI';
export default class ErrorMongoose extends ErrorAPI {
    data: any;
    constructor(message?: string, data?: {});
}
