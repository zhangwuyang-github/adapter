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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EasyEasyService_instances, _EasyEasyService_getWorkOrderIdByCode, _EasyEasyService_fetchWorkOrderDetailByCode, _EasyEasyService_getItemIdByCode, _EasyEasyService_fetchItemDetailByCode;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyEasyService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
let EasyEasyService = class EasyEasyService {
    constructor(mesService) {
        _EasyEasyService_instances.add(this);
        this.mesService = mesService;
        this.idFunctionMap = {
            ITEM: __classPrivateFieldGet(this, _EasyEasyService_instances, "m", _EasyEasyService_getItemIdByCode).bind(this),
            WORK_ORDER: __classPrivateFieldGet(this, _EasyEasyService_instances, "m", _EasyEasyService_getWorkOrderIdByCode).bind(this),
        };
    }
    async fetchIdByCode(code, type) {
        const func = this.idFunctionMap[type];
        const resp = await func(code);
        return resp;
    }
};
exports.EasyEasyService = EasyEasyService;
_EasyEasyService_instances = new WeakSet();
_EasyEasyService_getWorkOrderIdByCode = async function _EasyEasyService_getWorkOrderIdByCode(workOrderCode) {
    if (!workOrderCode) {
        return {
            code: 500,
            message: '请求参数为空',
            data: {
                entity: null,
            },
        };
    }
    const now = moment();
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
};
_EasyEasyService_fetchWorkOrderDetailByCode = async function _EasyEasyService_fetchWorkOrderDetailByCode(workOrderCode) {
    const workOrderIdResp = await __classPrivateFieldGet(this, _EasyEasyService_instances, "m", _EasyEasyService_getWorkOrderIdByCode).call(this, workOrderCode);
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
};
_EasyEasyService_getItemIdByCode = async function _EasyEasyService_getItemIdByCode(itemCode) {
    if (!itemCode) {
        return {
            code: 500,
            message: '请求参数为空',
            data: {
                entity: null,
            },
        };
    }
    const listResp = await this.mesService.fetchItemList({
        codeLike: itemCode,
        organizationIds: [],
        categoryIds: [],
        specFilters: [],
        specValueLike: '',
        types: [1, 2, 3],
        pagingParam: {
            start: 0,
            length: 500,
        },
    });
    if (listResp?.data?.code !== 200) {
        return {
            code: listResp?.data?.code,
            message: listResp?.data?.message,
            data: {
                entity: null,
            },
        };
    }
    const list = listResp?.data?.data?.list || [];
    const currentItem = list?.find((item) => item?.code === itemCode);
    if (!currentItem?.itemId) {
        return {
            code: 500,
            message: '未查询到对应的物料',
            data: {
                entity: null,
            },
        };
    }
    return {
        code: 200,
        message: '查询成功',
        data: {
            entity: currentItem?.itemId,
        },
    };
};
_EasyEasyService_fetchItemDetailByCode = async function _EasyEasyService_fetchItemDetailByCode(itemCode) {
    const itemIdResp = await __classPrivateFieldGet(this, _EasyEasyService_instances, "m", _EasyEasyService_getItemIdByCode).call(this, itemCode);
    if (itemIdResp?.code !== 200) {
        return {
            code: itemIdResp?.code,
            message: itemIdResp?.message,
            data: {
                entity: null,
            },
        };
    }
    const itemId = itemIdResp?.data?.entity;
    const detailResp = await this.mesService.fetchItemDetail(itemId);
    return detailResp?.data;
};
exports.EasyEasyService = EasyEasyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof MesService !== "undefined" && MesService) === "function" ? _a : Object])
], EasyEasyService);
//# sourceMappingURL=item.plugin.js.map