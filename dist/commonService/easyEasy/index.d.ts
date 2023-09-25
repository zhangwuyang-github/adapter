import { EntityResponse } from 'src/types/common';
import { LingYuService } from '../lingYu';
export declare class EasyEasyService {
    private lingYuService;
    constructor(lingYuService: LingYuService);
    getWorkOrderIdByCode(workOrderCode: string): Promise<EntityResponse<number>>;
    fetchWorkOrderDetailByCode(workOrderCode: string): Promise<EntityResponse<any>>;
}
