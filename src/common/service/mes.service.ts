import { Injectable } from '@nestjs/common';
import { OpenApiService } from './open.service';
import { EntityResponse, ListResponse } from 'src/common/types/response';
import {
  fetchWorkOrderListParams,
  WorkOrderDetail,
} from '../dto/work-order.dto';
import { AxiosResponse } from 'axios';
import { Item } from '../dto/item.dto';

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
}
