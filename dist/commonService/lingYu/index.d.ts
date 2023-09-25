import { OpenApiService } from '../openApi';
import { fetchWorkOrderListParams } from './types/type';
import { EntityResponse, ListResponse } from 'src/types/common';
import { WorkOrderDetail } from './types/workOrder';
export declare class LingYuService {
    private openApiService;
    constructor(openApiService: OpenApiService);
    fetchWorkOrderList(params: fetchWorkOrderListParams): Promise<{
        data: ListResponse<{
            workOrderId: number;
            workOrderNumber: string;
        }>;
    }>;
    fetchWorkOrderDetail(params: number): Promise<{
        data: EntityResponse<WorkOrderDetail>;
    }>;
}
