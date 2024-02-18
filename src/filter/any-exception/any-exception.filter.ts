import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from 'src/common/utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logFormat = {
      originUrl: request.url,
      method: request.method,
      IP: request.ip,
      statusCode: status,
      response: exception.toString(),
    };
    logger.error(logFormat);
    response.status(status).json({
      code: status,
      message: (exception as any)?.response?.message || (exception as any)?.message || `${exception}`,
    });
  }
}
