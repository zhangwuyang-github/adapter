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
exports.MesService = void 0;
const common_1 = require("@nestjs/common");
const open_service_1 = require("./open.service");
let MesService = class MesService {
    constructor(openApiService) {
        this.openApiService = openApiService;
    }
    fetchWorkOrderList(params) {
        return this.openApiService.request({
            url: '/api/manufacture/workOrder/list',
            method: 'post',
            data: {
                body: params,
            },
        });
    }
    fetchWorkOrderDetail(params) {
        return this.openApiService.request({
            url: '/api/manufacture/workOrder/detail/async/main',
            method: 'post',
            data: {
                body: params,
            },
        });
    }
    fetchItemList(body) {
        return this.openApiService.request({
            url: '/api/item/product/list',
            method: 'post',
            data: {
                body,
            },
        });
    }
    fetchItemDetail(body) {
        return this.openApiService.request({
            url: '/api/item/product/root/detail',
            method: 'post',
            data: {
                body,
            },
        });
    }
};
exports.MesService = MesService;
exports.MesService = MesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [open_service_1.OpenApiService])
], MesService);
//# sourceMappingURL=mes.service.js.map