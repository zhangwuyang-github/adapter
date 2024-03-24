import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncLocalStorage } from '../async-local-storage/async-local-storage.provider';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const request_id = uuidv4();
    asyncLocalStorage.run(new Map(), () => {
      asyncLocalStorage.getStore().set('request_id', request_id);
      next();
    });
  }
}
