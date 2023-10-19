import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { AllExceptionsFilter } from './filter/any-exception/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(new LoggerMiddleware().use);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(9000);
}
bootstrap();
