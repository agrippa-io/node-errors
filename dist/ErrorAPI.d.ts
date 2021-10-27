export declare class ErrorAPI extends Error {
    status: number;
    message: string;
    prototype: any;
    constructor(message: string, status?: number);
}
