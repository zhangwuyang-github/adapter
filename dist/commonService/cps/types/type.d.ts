export interface SearchEssentialBody {
    dataId: string;
    templateApiName: string;
    childTemplateApiNameArr?: string[];
}
export interface fetchCorePaasDetailParams {
    templateApiName: string;
    dataIds: string[];
    join?: {
        joinTables: {
            [key: string]: any;
        };
        flat: false;
    };
}
interface UpsertContent {
    id?: string;
    parent?: {
        templateApiName: string;
        id: string;
    };
    value: {
        [key: string]: any;
    };
    version?: number;
    children: {
        [key: string]: UpsertContent[];
    };
}
export interface upsertParams {
    templateApiName: string;
    contents: UpsertContent[];
}
export {};
