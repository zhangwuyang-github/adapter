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
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const open_api_service_1 = require("../plugin/open-api/open-api.service");
let AppService = AppService_1 = class AppService {
    constructor(configService, openService) {
        this.configService = configService;
        this.openService = openService;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    getHello() {
        return 'Hello World!';
    }
    postHello(body) {
        return body || 'Hello World!';
    }
    async getConfig() {
        const config = this.configService.get('http');
        const token = await this.openService.getToken();
        this.logger.log('token: ', token.d.d.d);
        return {
            code: 200,
            data: {
                entity: config,
                token: token,
            },
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        open_api_service_1.OpenApiService])
], AppService);
//# sourceMappingURL=app.service.js.map