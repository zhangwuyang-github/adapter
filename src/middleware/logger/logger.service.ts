import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
} from '@nestjs/common';
import type { Logger as WinstonLogger } from 'winston';
import { config, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { asyncLocalStorage } from '../async-local-storage/async-local-storage.provider';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

@Injectable()
export class LoggerService extends ConsoleLogger {
  private winstonLogger: WinstonLogger;

  constructor(context: string, options: ConsoleLoggerOptions) {
    super(context, options);
    this.initWinston();
  }

  protected get level(): LogLevel {
    return 'verbose' as LogLevel;
  }

  protected get maxFiles(): number {
    return 31;
  }

  protected get request_id(): string {
    const store = asyncLocalStorage.getStore();
    const request_id = store?.get('request_id');
    return request_id;
  }

  protected initWinston(): void {
    const baseLogPath = '../nest-log';

    this.winstonLogger = createLogger({
      levels: config.npm.levels,
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.json(),
      ),
      transports: [
        new transports.DailyRotateFile({
          level: this.level,
          filename: `${baseLogPath}/app.%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          maxFiles: this.maxFiles,
          format: format.combine(format.timestamp(), format.json()),
          auditFile: `${baseLogPath}/.audit/app.json`,
        }),
        new transports.DailyRotateFile({
          level: LogLevel.ERROR,
          filename: `${baseLogPath}/app-error.%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          maxFiles: this.maxFiles,
          format: format.combine(format.timestamp(), format.json()),
          auditFile: `${baseLogPath}/.audit/app-error.json`,
        }),
      ],
    });
  }

  verbose(message: any, context?: string): void {
    super.verbose.apply(this, [message, context]);

    this.winstonLogger.log(LogLevel.VERBOSE, message, { context });
  }

  debug(message: any, context?: string): void {
    super.debug.apply(this, [message, context]);

    this.winstonLogger.log(LogLevel.DEBUG, message, { context });
  }

  log(message: any, context?: string): void {
    const newMessage = `request_id: ${this.request_id}, message: ${message}`;
    super.log.apply(this, [newMessage, context]);

    this.winstonLogger.log(LogLevel.INFO, newMessage, { context });
  }

  warn(message: any, context?: string): void {
    const newMessage = `request_id: ${this.request_id}, message: ${message}`;
    super.warn.apply(this, [newMessage, context]);

    this.winstonLogger.log(LogLevel.WARN, newMessage);
  }

  error(message: any, stack?: string, context?: string): void {
    const newMessage = `request_id: ${this.request_id}, message: ${message}`;
    super.error.apply(this, [newMessage, stack, context]);

    const hasStack = !!context;
    this.winstonLogger.log(LogLevel.ERROR, {
      context: hasStack ? context : stack,
      message: hasStack ? new Error(newMessage) : newMessage,
    });
  }
}
