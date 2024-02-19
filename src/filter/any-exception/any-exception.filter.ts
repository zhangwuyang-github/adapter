import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessException } from './biz.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof BusinessException
      ? (exception as any)?.response?.code
      : exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exception as any)?.response?.message || (exception as any)?.message || `${exception}`;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(exception, undefined, 'Catch');
    } else {
      this.logger.warn(`错误信息：(${status}) ${message} Path: ${request?.url}`);
    }

    response.status(status).json({
      code: status,
      data: null,
      message,
    });
  }
}
