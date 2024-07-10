import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BYPASS_KEY } from './bypass.decorator';

class ResOp<T = any> {
  data?: T

  code: number

  message: string

  constructor(code: number, data: T, message = 'success') {
    this.code = code
    this.data = data
    this.message = message
  }

  static success<T>(data?: T, message?: string) {
    return new ResOp(200, data, message)
  }

  static error(code: number, message) {
    return new ResOp(code, {}, message)
  }
}

/**
 * 统一处理返回接口结果，如果不需要则添加 @Bypass 装饰器
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const bypass = this.reflector.get<boolean>(
      BYPASS_KEY,
      context.getHandler(),
    )

    if (bypass)
      return next.handle()

    return next.handle().pipe(
      map((data) => {
        return new ResOp(HttpStatus.OK, data ?? null)
      }),
    )
  }
}
