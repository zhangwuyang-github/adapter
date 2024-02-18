import { BaseResponse, EntityResponse, ListResponse } from 'src/common/types/response';
import { SearchEssentialBody, fetchCorePaasDetailParams, upsertParams } from 'src/common/types/cps';
import { OpenApiService } from '../open-api/open-api.service';
export declare class CorepassService {
    private openApiService;
    constructor(openApiService: OpenApiService);
    formatFetchCpsDetailParams(data: SearchEssentialBody): fetchCorePaasDetailParams;
    callCpsWebhook(params: {
        uuid: string;
        data: any;
    }): Promise<{
        data: BaseResponse;
    }>;
    fetchList(templateApiName: string, pagination: {
        current: number;
        pageSize: number;
    }, filter?: any, fuzzy?: boolean): Promise<{
        data: ListResponse<any>;
    }>;
    fetchDetail(params: fetchCorePaasDetailParams): Promise<{
        data: EntityResponse<any>;
    }>;
    singleDetail(params: SearchEssentialBody): Promise<EntityResponse<any>>;
    batchDelete(params: {
        templateId: string;
        dataIds: string[];
    }): Promise<import("axios").AxiosResponse<any, any>>;
    upsert(params: upsertParams): Promise<import("axios").AxiosResponse<any, any>>;
}