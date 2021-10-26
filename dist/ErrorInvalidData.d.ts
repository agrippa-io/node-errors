import ErrorAPI from './ErrorAPI';
export default class ErrorInvalidData extends ErrorAPI {
    constructor(message: string, status?: number);
}
