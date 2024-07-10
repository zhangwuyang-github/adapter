import { Injectable } from '@nestjs/common';
import { EntityResponse, ListResponse } from 'src/interface/common.interface';
import {
  fetchWorkOrderListParams,
  WorkOrderDetail,
} from '../../interface/work-order.interface';
import { AxiosResponse } from 'axios';
import { Item } from '../../interface/item.interface';
import { OpenApiService } from './open-api.service';

@Injectable()
export class MesService {
  constructor(private openApiService: OpenApiService) {}

  fetchWorkOrderList(params: fetchWorkOrderListParams): Promise<{
    data: ListResponse<{ workOrderId: number; workOrderNumber: string }>;
  }> {
    return this.openApiService.request({
      url: '/api/manufacture/workOrder/list',
      method: 'post',
      data: {
        body: params,
      },
    });
  }

  fetchWorkOrderDetail(
    params: number,
  ): Promise<{ data: EntityResponse<WorkOrderDetail> }> {
    return this.openApiService.request({
      url: '/api/manufacture/workOrder/detail/async/main',
      method: 'post',
      data: {
        body: params,
      },
    });
  }

  fetchItemList(body: {
    codeLike?: string;
    organizationIds?: number[];
    categoryIds?: number[];
    specFilters?: any[];
    specValueLike?: string;
    statuses?: number[];
    types?: number[];
    pagingParam: {
      start: number;
      length: number;
    };
  }): Promise<
    AxiosResponse<
      ListResponse<{
        itemId: string;
        code: string;
        name: string;
        type: string;
      }>
    >
  > {
    return this.openApiService.request({
      url: '/api/item/product/list',
      method: 'post',
      data: {
        body,
      },
    });
  }

  fetchItemDetail(body: string): Promise<AxiosResponse<EntityResponse<Item>>> {
    return this.openApiService.request({
      url: '/api/item/product/root/detail',
      method: 'post',
      data: {
        body,
      },
    });
  }

  fetchSaleOrderList(body: {
    customFieldParam: any[];
    createDate: {
      startDate: number;
      endDate: number;
    };
    sendStatusList: number[];
    returnStatusList: number[];
    sendSign: number[];
    newReturnSign: number[];
    documentStatusList: number[];
    orderNumber: string;
    start: number;
    length: number;
  }): Promise<
    AxiosResponse<
      ListResponse<{
        orderId: number;
        orderNumber: string;
      }>
    >
  > {
    return this.openApiService.request({
      url: '/api/coreplus/order/query/orders',
      method: 'post',
      data: {
        body,
      },
    });
  }

  fetchSaleOrderDetail(
    body: number,
  ): Promise<AxiosResponse<EntityResponse<SaleOrder>>> {
    return this.openApiService.request({
      url: `/api/coreplus/order/query/detail/${body}`,
      method: 'get',
    });
  }

  fetchDeliveryOrderList(body: {
    logisticsNumber: string;
    start_time: string;
    end_time: string;
    customFields: any[];
    page: number;
    size: number;
  }): Promise<
    AxiosResponse<
      ListResponse<{
        id: number;
        logisticsNumber: string;
        batchId: number;
        isMergeBatch: 0 | 1;
      }>
    >
  > {
    return this.openApiService.request({
      url: '/api/inventoryDelivery/deliveryHistory',
      method: 'post',
      data: {
        body,
      },
    });
  }

  fetchDeliveryOrderDetail(body: {
    inventoryBatchId: number;
    isMergeBatch: 0 | 1;
  }): Promise<
    AxiosResponse<{
      ret: boolean;
      message?: string;
      data: DeliveryOrder;
    }>
  > {
    return this.openApiService.request({
      url: '/api/inventoryDelivery/mergeOutInventory/detail',
      method: 'get',
      params: body,
    });
  }
}
