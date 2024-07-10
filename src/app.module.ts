import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProvidersModule } from './providers/providers.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './filter/transform.interceptor';
import { LoggerModule } from './middleware/logger/logger.module';
import { RequestIdMiddleware } from './middleware/request-id/request-id.middleware';

@Module({
  imports: [ProvidersModule, LoggerModule.forRoot()],
  controllers: [AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*'); // 对所有路由生效
  }
}
