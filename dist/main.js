"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const express = require("express");
const app_module_1 = require("./app.module");
const any_exception_filter_1 = require("./filter/any-exception/any-exception.filter");
const logger_service_1 = require("./middleware/logger/logger.service");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.useGlobalFilters(new any_exception_filter_1.AllExceptionsFilter());
    await app.listen(9000, async () => {
        app.useLogger(app.get(logger_service_1.LoggerService));
        const url = await app.getUrl();
        const logger = new common_1.Logger('NestApplication');
        logger.log(`Server running on ${url}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map