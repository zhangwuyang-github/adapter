"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../common/utils");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const code = res.statusCode;
        next();
        const logFormat = {
            originUrl: req.originalUrl,
            method: req.method,
            IP: req.ip,
            statusCode: code,
            params: JSON.stringify(req.params),
            query: JSON.stringify(req.query),
            body: JSON.stringify(req.body),
        };
        if (code !== 200) {
            utils_1.logger.error(logFormat);
        }
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map