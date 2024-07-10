import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { Logger } from '@nestjs/common';
import * as responseTime from 'response-time';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { LoggerService } from './middleware/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(responseTime());
  await app.listen(9000, async () => {
    app.useLogger(app.get(LoggerService));
    const url = await app.getUrl();
    const logger = new Logger('NestApplication');
    logger.log(`Server running on ${url}`);
  });
}
bootstrap();
