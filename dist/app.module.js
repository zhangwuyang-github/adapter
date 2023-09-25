"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./controller/app.controller");
const app_service_1 = require("./service/app.service");
const cps_1 = require("./commonService/cps");
const erp_1 = require("./commonService/erp");
const openApi_1 = require("./commonService/openApi");
const lingYu_1 = require("./commonService/lingYu");
const easyEasy_1 = require("./commonService/easyEasy");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'src/config/.env',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            cps_1.CpsService,
            erp_1.ErpService,
            openApi_1.OpenApiService,
            lingYu_1.LingYuService,
            easyEasy_1.EasyEasyService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map