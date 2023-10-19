import { OpenApiService } from './open.service';
import { EntityResponse, ListResponse } from 'src/common/types/response';
import { fetchWorkOrderListParams, WorkOrderDetail } from '../types/workOrder';
export declare class MesService {
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
