import { EntityResponse } from 'src/common/types/response';
import { MesService } from './mes.service';
export declare class EasyEasyService {
    private mesService;
    constructor(mesService: MesService);
    getWorkOrderIdByCode(workOrderCode: string): Promise<EntityResponse<number>>;
    fetchWorkOrderDetailByCode(workOrderCode: string): Promise<EntityResponse<any>>;
}
