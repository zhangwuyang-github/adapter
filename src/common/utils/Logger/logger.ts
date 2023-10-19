import * as Path from 'path';
import * as Log4js from 'log4js';
import * as Util from 'util';
import * as Moment from 'moment';
import * as StackTrace from 'stacktrace-js';
import Chalk from 'chalk';
import config from './configuration';

export enum LoggerLevel {
  ALL = 'ALl',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

// 组装日志样式
Log4js.addLayout('Awesome-nest', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = '';
    let position = '';

    const messageList: string[] = [];

    logEvent.data.forEach((msg) => {
      if (msg instanceof ContextTrace) {
        moduleName = msg.context;
        position = `${msg.lineNumber},${msg.columnNumber}`;
        return;
      }

      if (typeof msg !== 'string') {
        msg = Util.inspect(msg, false, 3, true);
      }

      messageList.push(msg);
    });

    const messageOutPut: string = messageList.join(' ');
    const positionOutPut: string = position ? `[${position}]` : '';
    const typeOutPut = `[${logConfig.type}] ${logEvent.pid.toString()} - `;
    const dateOutPut: string = Moment(logEvent.startTime).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    const moduleOutPut: string = moduleName
      ? `[${moduleName}]`
      : '[LoggerService]';
    let levelOutPut = `[${logEvent.level}] ${messageOutPut}`;

    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutPut = Chalk.green(levelOutPut);
        break;
      case LoggerLevel.INFO:
        levelOutPut = Chalk.cyan(levelOutPut);
        break;
      case LoggerLevel.WARN:
        levelOutPut = Chalk.yellow(levelOutPut);
        break;
      case LoggerLevel.ERROR:
        levelOutPut = Chalk.red(levelOutPut);
        break;
      case LoggerLevel.FATAL:
        levelOutPut = Chalk.hex('#DD4C35')(levelOutPut);
        break;
      default:
        levelOutPut = Chalk.grey(levelOutPut);
        break;
    }

    return `${Chalk.green(typeOutPut)}${dateOutPut} ${Chalk.yellow(
      moduleOutPut,
    )}${levelOutPut}${positionOutPut}`;
  };
});

// 注入配置
Log4js.configure(config);

// 实例化
const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args) {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args) {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args) {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args) {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}
