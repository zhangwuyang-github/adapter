import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Item } from 'src/common/dto/item.dto';
import { WorkOrderDetail } from 'src/common/dto/work-order.dto';
import { MesService } from 'src/common/service/mes.service';
import { EntityResponse } from 'src/common/types/response';

@Injectable()
export class CodeSearchService {
  constructor(private mesService: MesService) {}

  private readonly idFunctionMap = {
    ITEM: this.#getItemIdByCode.bind(this),
    WORK_ORDER: this.#getWorkOrderIdByCode.bind(this),
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
  ): Promise<EntityResponse<WorkOrderDetail>> {
    const workOrderIdResp = await this.#getWorkOrderIdByCode(workOrderCode);
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
  ): Promise<EntityResponse<Item>> {
    const itemIdResp = await this.#getItemIdByCode(itemCode);
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

  /**
   * 根据编码获取id
   * @throws 如果有时间范围，默认筛选近一年的，超过范围通过自定义筛选参数进行筛选
   * @param type - 单据类型
   * @param code - 单据编号
   * @param customFilter - 自定义筛选参数(可选)
   */
  async fetchIdByCode(
    type: keyof typeof this.idFunctionMap,
    code: string,
    customFilter?: Record<string, any>,
  ) {
    const func = this.idFunctionMap[type];
    const resp = await func(code, customFilter);
    return resp;
  }
}
