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
exports.LingYuService = void 0;
const common_1 = require("@nestjs/common");
const openApi_1 = require("../openApi");
let LingYuService = class LingYuService {
    constructor(openApiService) {
        this.openApiService = openApiService;
    }
    async fetchWorkOrderList(params) {
        try {
            return await this.openApiService.request({
                url: '/api/manufacture/workOrder/list',
                method: 'post',
                data: {
                    body: params,
                },
            });
        }
        catch (error) {
            return error;
        }
    }
    async fetchWorkOrderDetail(params) {
        try {
            return await this.openApiService.request({
                url: '/api/manufacture/workOrder/detail/async/main',
                method: 'post',
                data: {
                    body: params,
                },
            });
        }
        catch (error) {
            return error;
        }
    }
};
exports.LingYuService = LingYuService;
exports.LingYuService = LingYuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [openApi_1.OpenApiService])
], LingYuService);
//# sourceMappingURL=index.js.map