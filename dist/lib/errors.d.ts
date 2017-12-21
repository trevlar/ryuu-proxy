export declare class DomoException extends Error {
    statusCode: number;
    url: string;
    error: string;
    proxy: string;
    constructor(err: any, url: string);
}
