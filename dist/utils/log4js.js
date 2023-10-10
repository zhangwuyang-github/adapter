"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ContextTrace = exports.LoggerLevel = void 0;
const Path = require("path");
const Log4js = require("log4js");
const Util = require("util");
const Moment = require("moment");
const StackTrace = require("stacktrace-js");
const chalk_1 = require("chalk");
const log4js_1 = require("../config/log4js");
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel["ALL"] = "ALl";
    LoggerLevel["MARK"] = "MARK";
    LoggerLevel["TRACE"] = "TRACE";
    LoggerLevel["DEBUG"] = "DEBUG";
    LoggerLevel["INFO"] = "INFO";
    LoggerLevel["WARN"] = "WARN";
    LoggerLevel["ERROR"] = "ERROR";
    LoggerLevel["FATAL"] = "FATAL";
    LoggerLevel["OFF"] = "OFF";
})(LoggerLevel || (exports.LoggerLevel = LoggerLevel = {}));
class ContextTrace {
    constructor(context, path, lineNumber, columnNumber) {
        this.context = context;
        this.path = path;
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
    }
}
exports.ContextTrace = ContextTrace;
Log4js.addLayout('Awesome-nest', (logConfig) => {
    return (logEvent) => {
        let moduleName = '';
        let position = '';
        const messageList = [];
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
        const messageOutPut = messageList.join(' ');
        const positionOutPut = position ? `[${position}]` : '';
        const typeOutPut = `[${logConfig.type}] ${logEvent.pid.toString()} - `;
        const dateOutPut = Moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss');
        const moduleOutPut = moduleName
            ? `[${moduleName}]`
            : '[LoggerService]';
        let levelOutPut = `[${logEvent.level}] ${messageOutPut}`;
        switch (logEvent.level.toString()) {
            case LoggerLevel.DEBUG:
                levelOutPut = chalk_1.default.green(levelOutPut);
                break;
            case LoggerLevel.INFO:
                levelOutPut = chalk_1.default.cyan(levelOutPut);
                break;
            case LoggerLevel.WARN:
                levelOutPut = chalk_1.default.yellow(levelOutPut);
                break;
            case LoggerLevel.ERROR:
                levelOutPut = chalk_1.default.red(levelOutPut);
                break;
            case LoggerLevel.FATAL:
                levelOutPut = chalk_1.default.hex('#DD4C35')(levelOutPut);
                break;
            default:
                levelOutPut = chalk_1.default.grey(levelOutPut);
                break;
        }
        return `${chalk_1.default.green(typeOutPut)}${dateOutPut} ${chalk_1.default.yellow(moduleOutPut)}${levelOutPut}${positionOutPut}`;
    };
});
Log4js.configure(log4js_1.default);
const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;
class Logger {
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
    static getStackTrace(deep = 2) {
        const stackList = StackTrace.getSync();
        const stackInfo = stackList[deep];
        const lineNumber = stackInfo.lineNumber;
        const columnNumber = stackInfo.columnNumber;
        const fileName = stackInfo.fileName;
        const basename = Path.basename(fileName);
        return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=log4js.js.map