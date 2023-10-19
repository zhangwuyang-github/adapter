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
exports.CpsService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const open_service_1 = require("./open.service");
let CpsService = class CpsService {
    constructor(openApiService) {
        this.openApiService = openApiService;
    }
    formatFetchCpsDetailParams(data) {
        if (!data.childTemplateApiNameArr?.length) {
            return {
                templateApiName: data?.templateApiName,
                dataIds: [data?.dataId],
            };
        }
        const child = (0, lodash_1.fromPairs)(data.childTemplateApiNameArr?.map((api) => [api, {}]));
        return {
            templateApiName: data?.templateApiName,
            dataIds: [data?.dataId],
            join: {
                joinTables: child,
                flat: false,
            },
        };
    }
    callCpsWebhook(params) {
        return this.openApiService.request({
            url: `/api/metadata-flow/trigger/webhook/${params?.uuid}`,
            method: 'post',
            data: params?.data,
        });
    }
    fetchList(templateApiName, pagination, filter, fuzzy) {
        return this.openApiService.request({
            url: '/api/metadata-app/v2/data/query/search',
            method: 'post',
            data: {
                body: {
                    filter: filter || {},
                    start: (pagination?.current - 1) * pagination?.pageSize,
                    length: pagination?.pageSize,
                    templateApiName,
                    fuzzy: typeof fuzzy === 'boolean' ? fuzzy : true,
                },
            },
        });
    }
    fetchDetail(params) {
        return this.openApiService.request({
            url: '/api/metadata-app/v2/data/query/details',
            method: 'post',
            data: {
                body: params,
            },
        });
    }
    async singleDetail(params) {
        const resp = await this.fetchDetail(this.formatFetchCpsDetailParams(params));
        if (resp?.data?.code !== 200) {
            return resp?.data;
        }
        const detail = resp?.data?.data?.entity?.data?.[0];
        if (!detail) {
            return {
                code: 500,
                message: '查询CorePaas表单详情报错',
                data: {},
            };
        }
        return {
            code: 200,
            message: '查询成功',
            data: {
                entity: detail,
            },
        };
    }
    async batchDelete(params) {
        return this.openApiService.request({
            url: '/api/metadata-app/batch/delete',
            method: 'post',
            data: {
                body: params,
            },
        });
    }
    async upsert(params) {
        return this.openApiService.request({
            url: '/api/metadata-app/v2/data/operation/saveOrUpdate',
            method: 'post',
            data: {
                body: params,
            },
        });
    }
};
exports.CpsService = CpsService;
exports.CpsService = CpsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [open_service_1.OpenApiService])
], CpsService);
//# sourceMappingURL=cps.service.js.map