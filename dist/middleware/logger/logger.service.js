"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = exports.LogLevel = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
require("winston-daily-rotate-file");
var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["DEBUG"] = "debug";
    LogLevel["VERBOSE"] = "verbose";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
let LoggerService = class LoggerService extends common_1.ConsoleLogger {
    constructor(context, options) {
        super(context, options);
        this.initWinston();
    }
    get level() {
        return 'verbose';
    }
    get maxFiles() {
        return 31;
    }
    initWinston() {
        const baseLogPath = '../nest-log';
        this.winstonLogger = (0, winston_1.createLogger)({
            levels: winston_1.config.npm.levels,
            format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp(), winston_1.format.json()),
            transports: [
                new winston_1.transports.DailyRotateFile({
                    level: this.level,
                    filename: `${baseLogPath}/app.%DATE%.log`,
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: this.maxFiles,
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                    auditFile: `${baseLogPath}/.audit/app.json`,
                }),
                new winston_1.transports.DailyRotateFile({
                    level: LogLevel.ERROR,
                    filename: `${baseLogPath}/app-error.%DATE%.log`,
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: this.maxFiles,
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                    auditFile: `${baseLogPath}/.audit/app-error.json`,
                }),
            ],
        });
    }
    verbose(message, context) {
        super.verbose.apply(this, [message, context]);
        this.winstonLogger.log(LogLevel.VERBOSE, message, { context });
    }
    debug(message, context) {
        super.debug.apply(this, [message, context]);
        this.winstonLogger.log(LogLevel.DEBUG, message, { context });
    }
    log(message, context) {
        super.log.apply(this, [message, context]);
        this.winstonLogger.log(LogLevel.INFO, message, { context });
    }
    warn(message, context) {
        super.warn.apply(this, [message, context]);
        this.winstonLogger.log(LogLevel.WARN, message);
    }
    error(message, stack, context) {
        super.error.apply(this, [message, stack, context]);
        const hasStack = !!context;
        this.winstonLogger.log(LogLevel.ERROR, {
            context: hasStack ? context : stack,
            message: hasStack ? new Error(message) : message,
        });
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String, Object])
], LoggerService);
//# sourceMappingURL=logger.service.js.map