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
var _CodeSearchService_instances, _CodeSearchService_getWorkOrderIdByCode, _CodeSearchService_fetchWorkOrderDetailByCode, _CodeSearchService_getItemIdByCode, _CodeSearchService_fetchItemDetailByCode, _CodeSearchService_getSaleOrderIdByCode, _CodeSearchService_fetchSaleOrderDetailByCode, _CodeSearchService_getDeliveryOrderIdByCode, _CodeSearchService_fetchDeliveryOrderDetailByCode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeSearchService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const mes_service_1 = require("../mes/mes.service");
let CodeSearchService = class CodeSearchService {
    constructor(mesService) {
        _CodeSearchService_instances.add(this);
        this.mesService = mesService;
        this.functionMap = {
            物料: {
                idFunc: __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_getItemIdByCode).bind(this),
                detailFunc: __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_fetchItemDetailByCode).bind(this),
            },
            生产单: {
                idFunc: __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_getWorkOrderIdByCode).bind(this),
                detailFunc: __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_fetchWorkOrderDetailByCode).bind(this),
            },
            销售订单: {
                idFunc: __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_getSaleOrderIdByCode).bind(this),
                detailFunc: __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_fetchSaleOrderDetailByCode).bind(this),
            },
            发货单: {
                idFunc: __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_getDeliveryOrderIdByCode).bind(this),
                detailFunc: __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_fetchDeliveryOrderDetailByCode).bind(this),
            },
        };
    }
    async fetchIdByCode(type, code, customFilter) {
        const func = this.functionMap[type]?.idFunc;
        const resp = await func(code, customFilter);
        return resp;
    }
    async fetchDetailByCode(type, code, customFilter) {
        const func = this.functionMap[type]?.detailFunc;
        const resp = await func(code, customFilter);
        return resp;
    }
};
exports.CodeSearchService = CodeSearchService;
_CodeSearchService_instances = new WeakSet();
_CodeSearchService_getWorkOrderIdByCode = async function _CodeSearchService_getWorkOrderIdByCode(workOrderCode, customFilter = {}) {
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
        ...customFilter,
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
_CodeSearchService_fetchWorkOrderDetailByCode = async function _CodeSearchService_fetchWorkOrderDetailByCode(workOrderCode, customFilter) {
    const workOrderIdResp = await __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_getWorkOrderIdByCode).call(this, workOrderCode, customFilter);
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
_CodeSearchService_getItemIdByCode = async function _CodeSearchService_getItemIdByCode(itemCode, customFilter = {}) {
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
        ...customFilter,
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
_CodeSearchService_fetchItemDetailByCode = async function _CodeSearchService_fetchItemDetailByCode(itemCode, customFilter) {
    const itemIdResp = await __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_getItemIdByCode).call(this, itemCode, customFilter);
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
_CodeSearchService_getSaleOrderIdByCode = async function _CodeSearchService_getSaleOrderIdByCode(saleOrderCode, customFilter = {}) {
    if (!saleOrderCode) {
        return {
            code: 500,
            message: '请求参数为空',
            data: {
                entity: null,
            },
        };
    }
    const now = moment().valueOf();
    const lastYear = moment().add(-1, 'years').valueOf();
    const listResp = await this.mesService.fetchSaleOrderList({
        customFieldParam: [],
        createDate: {
            startDate: lastYear,
            endDate: now,
        },
        sendStatusList: [],
        returnStatusList: [],
        sendSign: [],
        newReturnSign: [],
        documentStatusList: [],
        orderNumber: saleOrderCode,
        start: 0,
        length: 100,
        ...customFilter,
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
    const currentSaleOrder = list?.find((item) => item?.orderNumber === saleOrderCode);
    if (!currentSaleOrder?.orderId) {
        return {
            code: 500,
            message: '未查询到对应的销售订单',
            data: {
                entity: null,
            },
        };
    }
    return {
        code: 200,
        message: '查询成功',
        data: {
            entity: currentSaleOrder?.orderId,
        },
    };
};
_CodeSearchService_fetchSaleOrderDetailByCode = async function _CodeSearchService_fetchSaleOrderDetailByCode(saleOrderCode, customFilter) {
    const itemIdResp = await __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_getSaleOrderIdByCode).call(this, saleOrderCode, customFilter);
    if (itemIdResp?.code !== 200) {
        return {
            code: itemIdResp?.code,
            message: itemIdResp?.message,
            data: {
                entity: null,
            },
        };
    }
    const saleOrderId = itemIdResp?.data?.entity;
    const detailResp = await this.mesService.fetchSaleOrderDetail(saleOrderId);
    return detailResp?.data;
};
_CodeSearchService_getDeliveryOrderIdByCode = async function _CodeSearchService_getDeliveryOrderIdByCode(code, customFilter = {}) {
    if (!code) {
        return {
            code: 500,
            message: '请求参数为空',
            data: {
                entity: null,
            },
        };
    }
    const now = moment().format('YYYY-MM-DD');
    const lastYear = moment().add(-1, 'years').format('YYYY-MM-DD');
    const listResp = await this.mesService.fetchDeliveryOrderList({
        start_time: lastYear,
        end_time: now,
        customFields: [],
        page: 1,
        size: 50,
        logisticsNumber: code,
        ...customFilter,
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
    const current = list?.find((item) => item?.logisticsNumber === code);
    if (!current?.id) {
        return {
            code: 500,
            message: '未查询到对应的发货单',
            data: {
                entity: null,
            },
        };
    }
    return {
        code: 200,
        message: '查询成功',
        data: {
            entity: current?.batchId,
            isMergeBatch: current?.isMergeBatch,
        },
    };
};
_CodeSearchService_fetchDeliveryOrderDetailByCode = async function _CodeSearchService_fetchDeliveryOrderDetailByCode(code, customFilter) {
    const idResp = await __classPrivateFieldGet(this, _CodeSearchService_instances, "m", _CodeSearchService_getDeliveryOrderIdByCode).call(this, code, customFilter);
    if (idResp?.code !== 200) {
        return {
            code: idResp?.code,
            message: idResp?.message,
            data: {
                entity: null,
            },
        };
    }
    const id = idResp?.data?.entity;
    const isMergeBatch = idResp?.data?.isMergeBatch;
    const detailResp = await this.mesService.fetchDeliveryOrderDetail({
        inventoryBatchId: id,
        isMergeBatch,
    });
    if (!detailResp?.data?.ret) {
        return {
            code: 500,
            message: detailResp?.data?.message || `MES查询发货单「${code}」失败`,
            data: {
                entity: null,
            },
        };
    }
    return {
        code: 200,
        message: 'success',
        data: {
            entity: detailResp?.data?.data,
        },
    };
};
exports.CodeSearchService = CodeSearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mes_service_1.MesService])
], CodeSearchService);
//# sourceMappingURL=code-search.service.js.map