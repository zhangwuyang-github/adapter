import { MesService } from 'src/common/service/mes.service';
export declare class CodeSearchService {
    #private;
    private mesService;
    constructor(mesService: MesService);
    private readonly idFunctionMap;
    fetchIdByCode(type: keyof typeof this.idFunctionMap, code: string, customFilter?: Record<string, any>): Promise<any>;
}
