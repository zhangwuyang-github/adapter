import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessException extends HttpException {
  private errorCode: number;

  constructor(error: string, code: HttpStatus = 403) {
    super(
      HttpException.createBody({
        code,
        message: error,
      }),
      HttpStatus.OK,
    );

    this.errorCode = code;
  }

  getErrorCode(): number {
    return this.errorCode;
  }
}
