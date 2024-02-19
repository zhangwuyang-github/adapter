import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { PluginModule } from './plugin/plugin.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './filter/any-exception/transform.interceptor';
import { LoggerModule } from './middleware/logger/logger.module';

@Module({
  imports: [
    PluginModule,
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
  ],
})
export class AppModule {}
