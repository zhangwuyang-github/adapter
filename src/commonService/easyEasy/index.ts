import { Injectable } from '@nestjs/common';
import { EntityResponse } from '../openApi/type';
import { LingYuService } from '../lingYu';
import moment from 'moment';

@Injectable()
export class EasyEasyService {
  constructor(private lingYuService: LingYuService) {}

  /** 根据生产单编号查生产单id */
  async getWorkOrderIdByCode(
    workOrderCode: string,
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

    const workOrderListResp = await this.lingYuService.fetchWorkOrderList({
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
  async fetchWorkOrderDetailByCode(
    workOrderCode: string,
  ): Promise<EntityResponse<any>> {
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

    const workOrderDetailResp = await this.lingYuService.fetchWorkOrderDetail(
      workOrderId,
    );

    return workOrderDetailResp?.data;
  }
}
