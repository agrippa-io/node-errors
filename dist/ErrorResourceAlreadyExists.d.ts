import ErrorAPI from './ErrorAPI';
export default class ErrorResourceAlreadyExists extends ErrorAPI {
    data: any;
    constructor(message?: string, data?: {});
}
