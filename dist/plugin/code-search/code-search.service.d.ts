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
export declare class CodeSearchService {
    #private;
    private mesService;
    constructor(mesService: MesService);
    private readonly functionMap;
    fetchIdByCode(type: keyof typeof this.functionMap, code: string, customFilter?: Record<string, any>): Promise<EntityResponse<number | string>>;
    fetchDetailByCode(type: keyof typeof this.functionMap, code: string, customFilter?: Record<string, any>): Promise<EntityResponse<ReturnDataTypeMap[typeof type]>>;
}
export {};
