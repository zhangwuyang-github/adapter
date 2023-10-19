"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const express = require("express");
const app_module_1 = require("./app.module");
const logger_middleware_1 = require("./middleware/logger/logger.middleware");
const any_exception_filter_1 = require("./filter/any-exception/any-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(new logger_middleware_1.LoggerMiddleware().use);
    app.useGlobalFilters(new any_exception_filter_1.AllExceptionsFilter());
    await app.listen(9000);
}
bootstrap();
//# sourceMappingURL=main.js.map