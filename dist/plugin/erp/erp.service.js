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
exports.ErpService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let ErpService = class ErpService {
    constructor(configService) {
        this.configService = configService;
    }
    async getChanJetToken() {
        const config = this.configService.get('http');
        const chanJetConfig = config.chanJet;
        const { host, key, secret, refreshToken } = chanJetConfig;
        const resp = await (0, axios_1.default)({
            headers: {
                appKey: key,
                appSecret: secret,
                ['Content-Type']: 'application/json',
            },
            url: `${host}/auth/v2/refreshToken?grantType=refresh_token&refreshToken=${refreshToken}`,
            method: 'get',
        });
        return resp?.data?.result?.access_token || '';
    }
    async chanJetRequest(requestBody) {
        try {
            const token = await this.getChanJetToken();
            const config = this.configService.get('http');
            const chanJetConfig = config.chanJet;
            const { host, key, secret } = chanJetConfig;
            return (0, axios_1.default)({
                headers: {
                    appKey: key,
                    appSecret: secret,
                    openToken: token,
                    ['Content-Type']: 'application/json',
                },
                url: `${host}${requestBody?.url}`,
                method: requestBody?.method,
                data: requestBody?.data,
            });
        }
        catch (error) {
            return error;
        }
    }
    async getK3WiseToken() {
        const config = this.configService.get('http');
        const k3wiseConfig = config.k3wise;
        const { host, authorityCode } = k3wiseConfig;
        const resp = await (0, axios_1.default)({
            method: 'get',
            url: `${host}/K3API/Token/Create?authorityCode=${authorityCode}`,
        });
        return resp?.data?.Data?.Token;
    }
    async k3WiseRequest(requestBody) {
        const token = await this.getK3WiseToken();
        const config = this.configService.get('http');
        const k3wiseConfig = config.k3wise;
        const { host } = k3wiseConfig;
        return (0, axios_1.default)({
            url: `${host}${requestBody?.url}?token=${token}`,
            method: requestBody?.method,
            data: requestBody?.data,
        });
    }
    async getK3CloudToken() {
        const config = this.configService.get('http');
        const k3cloudConfig = config.k3cloud;
        const { host, acctid, key, secret, lcid } = k3cloudConfig;
        const resp = await (0, axios_1.default)({
            url: `${host}/Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser.common.kdsvc`,
            method: 'post',
            data: {
                acctID: acctid,
                username: key,
                password: secret,
                lcid: lcid,
            },
        });
        const cookies = resp?.headers['set-cookie'];
        const cookie = cookies?.find((c) => c.includes('kdservice-sessionid'));
        return cookie;
    }
    async k3CloudRequest(requestBody) {
        const cookie = await this.getK3CloudToken();
        const config = this.configService.get('http');
        const k3cloudConfig = config.k3cloud;
        const { host } = k3cloudConfig;
        return (0, axios_1.default)({
            url: `${host}${requestBody?.url}`,
            method: requestBody?.method,
            data: requestBody?.data,
            headers: {
                Cookie: cookie,
            },
        });
    }
};
exports.ErpService = ErpService;
exports.ErpService = ErpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ErpService);
//# sourceMappingURL=erp.service.js.map