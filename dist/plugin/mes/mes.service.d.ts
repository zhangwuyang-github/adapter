import { EntityResponse, ListResponse } from 'src/common/types/response';
import { fetchWorkOrderListParams, WorkOrderDetail } from '../../dto/work-order.dto';
import { AxiosResponse } from 'axios';
import { Item } from '../../dto/item.dto';
import { OpenApiService } from '../open-api/open-api.service';
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
    }): Promise<AxiosResponse<ListResponse<{
        orderId: number;
        orderNumber: string;
    }>>>;
    fetchSaleOrderDetail(body: number): Promise<AxiosResponse<EntityResponse<SaleOrder>>>;
    fetchDeliveryOrderList(body: {
        logisticsNumber: string;
        start_time: string;
        end_time: string;
        customFields: any[];
        page: number;
        size: number;
    }): Promise<AxiosResponse<ListResponse<{
        id: number;
        logisticsNumber: string;
        batchId: number;
        isMergeBatch: 0 | 1;
    }>>>;
    fetchDeliveryOrderDetail(body: {
        inventoryBatchId: number;
        isMergeBatch: 0 | 1;
    }): Promise<AxiosResponse<{
        ret: boolean;
        message?: string;
        data: DeliveryOrder;
    }>>;
}
