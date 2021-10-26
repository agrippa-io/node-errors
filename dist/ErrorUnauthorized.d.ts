import ErrorAPI from './ErrorAPI';
export default class ErrorUnauthorized extends ErrorAPI {
    data: any;
    constructor(message?: string, data?: {});
}
