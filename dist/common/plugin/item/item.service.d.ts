import { MesService } from 'src/common/service/mes.service';
export declare class EasyEasyService {
    #private;
    private mesService;
    constructor(mesService: MesService);
    private readonly idFunctionMap;
    fetchIdByCode(code: string, type: keyof typeof this.idFunctionMap): Promise<any>;
}
