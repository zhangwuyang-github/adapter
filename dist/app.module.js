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
const cache_manager_1 = require("@nestjs/cache-manager");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./service/app.service");
const cps_service_1 = require("./common/service/cps.service");
const erp_service_1 = require("./common/service/erp.service");
const open_service_1 = require("./common/service/open.service");
const mes_service_1 = require("./common/service/mes.service");
const configuration_1 = require("./configuration");
const plugin_module_1 = require("./common/plugin/plugin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            plugin_module_1.PluginModule,
            cache_manager_1.CacheModule.register(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            cps_service_1.CpsService,
            erp_service_1.ErpService,
            open_service_1.OpenApiService,
            mes_service_1.MesService,
            config_1.ConfigService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map