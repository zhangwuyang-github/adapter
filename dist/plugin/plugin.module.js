"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginModule = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const configuration_1 = require("../configuration");
const mes_service_1 = require("./mes/mes.service");
const open_api_service_1 = require("./open-api/open-api.service");
const erp_service_1 = require("./erp/erp.service");
const corepass_service_1 = require("./corepass/corepass.service");
const code_search_service_1 = require("./code-search/code-search.service");
let PluginModule = class PluginModule {
};
exports.PluginModule = PluginModule;
exports.PluginModule = PluginModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
        ],
        providers: [
            code_search_service_1.CodeSearchService,
            mes_service_1.MesService,
            open_api_service_1.OpenApiService,
            erp_service_1.ErpService,
            corepass_service_1.CorepassService,
        ],
        exports: [
            code_search_service_1.CodeSearchService,
            mes_service_1.MesService,
            open_api_service_1.OpenApiService,
            erp_service_1.ErpService,
            corepass_service_1.CorepassService,
        ],
    })
], PluginModule);
//# sourceMappingURL=plugin.module.js.map