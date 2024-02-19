import { HttpException, HttpStatus } from "@nestjs/common";
export declare class BusinessException extends HttpException {
    private errorCode;
    constructor(error: string, code?: HttpStatus);
    getErrorCode(): number;
}
