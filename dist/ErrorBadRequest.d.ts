import ErrorAPI from './ErrorAPI';
export default class ErrorBadRequest extends ErrorAPI {
    data: any;
    constructor(message?: string, data?: {});
}
