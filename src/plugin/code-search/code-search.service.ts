import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Item } from 'src/dto/item.dto';
import { WorkOrderDetail } from 'src/dto/work-order.dto';
import { EntityResponse } from 'src/common/types/response';
import { MesService } from '../mes/mes.service';

interface ReturnDataTypeMap {
  物料: Item;
  生产单: WorkOrderDetail;
  销售订单: SaleOrder;
  发货单: DeliveryOrder;
}

@Injectable()
export class CodeSearchService {
  constructor(private mesService: MesService) {}

  private readonly functionMap = {
    物料: {
      idFunc: this.#getItemIdByCode.bind(this),
      detailFunc: this.#fetchItemDetailByCode.bind(this),
    },
    生产单: {
      idFunc: this.#getWorkOrderIdByCode.bind(this),
      detailFunc: this.#fetchWorkOrderDetailByCode.bind(this),
    },
    销售订单: {
      idFunc: this.#getSaleOrderIdByCode.bind(this),
      detailFunc: this.#fetchSaleOrderDetailByCode.bind(this),
    },
    发货单: {
      idFunc: this.#getDeliveryOrderIdByCode.bind(this),
      detailFunc: this.#fetchDeliveryOrderDetailByCode.bind(this),
    },
  } as const;

  /** 根据生产单编号查生产单id */
  async #getWorkOrderIdByCode(
    workOrderCode: string,
    customFilter: Record<string, any> = {},
  ): Promise<EntityResponse<number>> {
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
    const currentWorkOrder = workOrderList?.find(
      (order) => order?.workOrderNumber === workOrderCode,
    );

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

  /** 根据生产单编号查详情 */
  async #fetchWorkOrderDetailByCode(
    workOrderCode: string,
    customFilter?: Record<string, any>,
  ): Promise<EntityResponse<WorkOrderDetail>> {
    const workOrderIdResp = await this.#getWorkOrderIdByCode(
      workOrderCode,
      customFilter,
    );
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
    const workOrderDetailResp = await this.mesService.fetchWorkOrderDetail(
      workOrderId,
    );
    return workOrderDetailResp?.data;
  }

  /** 根据物料编号查物料id */
  async #getItemIdByCode(
    itemCode: string,
    customFilter: Record<string, any> = {},
  ): Promise<EntityResponse<string>> {
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
  }

  /** 根据物料编号查详情 */
  async #fetchItemDetailByCode(
    itemCode: string,
    customFilter?: Record<string, any>,
  ): Promise<EntityResponse<Item>> {
    const itemIdResp = await this.#getItemIdByCode(itemCode, customFilter);
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
  }

  /** 根据销售订单编号查销售订单id */
  async #getSaleOrderIdByCode(
    saleOrderCode: string,
    customFilter: Record<string, any> = {},
  ): Promise<EntityResponse<number>> {
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
    const currentSaleOrder = list?.find(
      (item) => item?.orderNumber === saleOrderCode,
    );

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
  }

  /** 根据物料编号查详情 */
  async #fetchSaleOrderDetailByCode(
    saleOrderCode: string,
    customFilter?: Record<string, any>,
  ): Promise<EntityResponse<SaleOrder>> {
    const itemIdResp = await this.#getSaleOrderIdByCode(
      saleOrderCode,
      customFilter,
    );
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
  }

  /** 根据发货单编号查发货单id */
  async #getDeliveryOrderIdByCode(
    code: string,
    customFilter: Record<string, any> = {},
  ): Promise<EntityResponse<number, { isMergeBatch?: 0 | 1 }>> {
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
  }

  /** 根据发货单编号查详情 */
  async #fetchDeliveryOrderDetailByCode(
    code: string,
    customFilter?: Record<string, any>,
  ): Promise<EntityResponse<DeliveryOrder>> {
    const idResp = await this.#getDeliveryOrderIdByCode(code, customFilter);
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
  }

  /**
   * 根据编码获取id
   * @throws 如果有时间范围，默认筛选近一年的，超过范围通过自定义筛选参数进行筛选
   * @param type - 单据类型
   * @param code - 单据编号
   * @param customFilter - 自定义筛选参数(可选)
   */
  async fetchIdByCode(
    type: keyof typeof this.functionMap,
    code: string,
    customFilter?: Record<string, any>,
  ): Promise<EntityResponse<number | string>> {
    const func = this.functionMap[type]?.idFunc;
    const resp = await func(code, customFilter);
    return resp;
  }

  /**
   * 根据编码获取单据详情
   * @throws 如果有时间范围，默认筛选近一年的，超过范围通过自定义筛选参数进行筛选
   * @param type - 单据类型
   * @param code - 单据编号
   * @param customFilter - 自定义筛选参数(可选)
   */
  async fetchDetailByCode(
    type: keyof typeof this.functionMap,
    code: string,
    customFilter?: Record<string, any>,
  ): Promise<EntityResponse<ReturnDataTypeMap[typeof type]>> {
    const func = this.functionMap[type]?.detailFunc;
    const resp = await func(code, customFilter);
    return resp;
  }
}
