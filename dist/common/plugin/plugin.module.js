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
const mes_service_1 = require("../service/mes.service");
const code_search_service_1 = require("./code-search/code-search.service");
const open_service_1 = require("../service/open.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const configuration_1 = require("../../configuration");
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
        providers: [mes_service_1.MesService, open_service_1.OpenApiService, code_search_service_1.CodeSearchService],
        exports: [code_search_service_1.CodeSearchService],
    })
], PluginModule);
//# sourceMappingURL=plugin.module.js.map