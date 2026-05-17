export declare class ErrorAPI extends Error {
    status: number;
    message: string;
    prototype: unknown;
    constructor(message: string, status?: number);
}
