import { Injectable } from '@nestjs/common';
import { OpenApiService } from '../openApi';
import { fetchWorkOrderListParams } from './types/type';
import { EntityResponse, ListResponse } from 'src/types/common';
import { WorkOrderDetail } from './types/workOrder';

@Injectable()
export class LingYuService {
  constructor(private openApiService: OpenApiService) {}

  async fetchWorkOrderList(params: fetchWorkOrderListParams): Promise<{
    data: ListResponse<{ workOrderId: number; workOrderNumber: string }>;
  }> {
    try {
      return await this.openApiService.request({
        url: '/api/manufacture/workOrder/list',
        method: 'post',
        data: {
          body: params,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async fetchWorkOrderDetail(
    params: number,
  ): Promise<{ data: EntityResponse<WorkOrderDetail> }> {
    try {
      return await this.openApiService.request({
        url: '/api/manufacture/workOrder/detail/async/main',
        method: 'post',
        data: {
          body: params,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
