import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from 'src/common/utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode;
    next();
    const logFormat = {
      originUrl: req.originalUrl,
      method: req.method,
      IP: req.ip,
      statusCode: code,
      params: JSON.stringify(req.params),
      query: JSON.stringify(req.query),
      body: JSON.stringify(req.body),
    };
    if (code !== 200) {
      logger.error(logFormat);
    }
  }
}
