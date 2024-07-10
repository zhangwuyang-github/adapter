import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { LoggerService } from './middleware/logger/logger.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(9000, async () => {
    app.useLogger(app.get(LoggerService));
    const url = await app.getUrl();
    const logger = new Logger('NestApplication');
    logger.log(`Server running on ${url}`);
  });
}
bootstrap();
