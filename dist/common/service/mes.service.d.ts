import { OpenApiService } from './open.service';
import { EntityResponse, ListResponse } from 'src/common/types/response';
import { fetchWorkOrderListParams, WorkOrderDetail } from '../dto/work-order.dto';
import { AxiosResponse } from 'axios';
import { Item } from '../dto/item.dto';
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
    }): Promise<AxiosResponse<ListResponse<{
        itemId: string;
        code: string;
        name: string;
        type: string;
    }>>>;
    fetchItemDetail(body: string): Promise<AxiosResponse<EntityResponse<Item>>>;
}
