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
exports.EasyEasyService = void 0;
const common_1 = require("@nestjs/common");
const mes_service_1 = require("./mes.service");
const moment_1 = require("moment");
let EasyEasyService = class EasyEasyService {
    constructor(mesService) {
        this.mesService = mesService;
    }
    async getWorkOrderIdByCode(workOrderCode) {
        if (!workOrderCode) {
            return {
                code: 500,
                message: '请求参数为空',
                data: {
                    entity: null,
                },
            };
        }
        const now = (0, moment_1.default)();
        const lastYear = now.add(-1, 'years');
        const workOrderListResp = await this.mesService.fetchWorkOrderList({
            startTime: lastYear.valueOf(),
            endTime: now.valueOf(),
            creatorIds: [],
            assigneeParams: [],
            paginationParam: {
                start: 0,
                length: 50,
            },
            productionQtyParams: [],
            itemSearchParam: {
                filters: [],
                name: '',
                attribute: '',
            },
            status: [0, 1, 2, 4],
            timeType: 3,
            workOrderNumber: workOrderCode,
        });
        if (workOrderListResp?.data?.code !== 200) {
            return {
                code: workOrderListResp?.data?.code,
                message: workOrderListResp?.data?.message,
                data: {
                    entity: null,
                },
            };
        }
        const workOrderList = workOrderListResp?.data?.data?.list || [];
        const currentWorkOrder = workOrderList?.find((order) => order?.workOrderNumber === workOrderCode);
        if (!currentWorkOrder?.workOrderId) {
            return {
                code: 500,
                message: '未查询到对应的生产单',
                data: {
                    entity: null,
                },
            };
        }
        return {
            code: 200,
            message: '查询成功',
            data: {
                entity: currentWorkOrder?.workOrderId,
            },
        };
    }
    async fetchWorkOrderDetailByCode(workOrderCode) {
        const workOrderIdResp = await this.getWorkOrderIdByCode(workOrderCode);
        if (workOrderIdResp?.code !== 200) {
            return {
                code: workOrderIdResp?.code,
                message: workOrderIdResp?.message,
                data: {
                    entity: null,
                },
            };
        }
        const workOrderId = workOrderIdResp?.data?.entity;
        const workOrderDetailResp = await this.mesService.fetchWorkOrderDetail(workOrderId);
        return workOrderDetailResp?.data;
    }
};
exports.EasyEasyService = EasyEasyService;
exports.EasyEasyService = EasyEasyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mes_service_1.MesService])
], EasyEasyService);
//# sourceMappingURL=easy.service.js.map