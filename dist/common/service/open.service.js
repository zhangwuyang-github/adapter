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
exports.OpenApiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let OpenApiService = class OpenApiService {
    constructor(configService) {
        this.configService = configService;
    }
    async getToken() {
        const config = this.configService.get('http');
        const mesConfig = config.mes;
        const { host, appKey, appSecret } = mesConfig;
        const resp = await (0, axios_1.default)({
            url: `${host}/api/open/v2/token`,
            method: 'post',
            data: {
                body: {
                    appKey,
                    appSecret,
                },
            },
        });
        return resp;
    }
    async batchRequest(tasks, max) {
        max = max || 3;
        const results = [];
        let together = new Array(max).fill(null);
        let index = 0;
        together = together.map(() => {
            return new Promise((resolve, reject) => {
                const run = () => {
                    if (index >= tasks.length) {
                        resolve();
                        return;
                    }
                    const oldIndex = index;
                    const task = tasks[index++];
                    task()
                        .then((result) => {
                        results[oldIndex] = result;
                        run();
                    })
                        .catch((error) => {
                        reject(error);
                    });
                };
                run();
            });
        });
        await Promise.all(together);
        return results;
    }
    async request(requestBody) {
        const tokenResp = await this.getToken();
        const token = tokenResp?.data?.data?.accessToken;
        const config = this.configService.get('http');
        const mesConfig = config.mes;
        const { host } = mesConfig;
        return (0, axios_1.default)({
            url: `${host}${requestBody?.url}`,
            method: requestBody?.method,
            data: requestBody?.data,
            headers: {
                Authorization: token,
            },
        });
    }
};
exports.OpenApiService = OpenApiService;
exports.OpenApiService = OpenApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenApiService);
//# sourceMappingURL=open.service.js.map