export interface IdAndName {
    id: number;
    name: string;
}
export interface CodeAndName {
    code: string;
    name: string;
}
export interface EnvConfig {
    HOST: string;
    APP_KEY: string;
    APP_SECRET: string;
    HOST_CHANJET?: string;
    KEY_CHANJET?: string;
    SECRET_CHANJET?: string;
    AUTHORITY_CODE_CHANJET?: string;
    HOST_K3WISE?: string;
    KEY_K3WISE?: string;
    SECRET_K3WISE?: string;
    AUTHORITY_CODE_K3WISE?: string;
    HOST_K3CLOUD?: string;
    KEY_K3CLOUD?: string;
    SECRET_K3CLOUD?: string;
    LCID_K3CLOUD: number;
    ACCTID_K3CLOUD: number;
}
export interface BaseResponse {
    code: 200 | 500;
    message?: string;
}
export interface EntityResponse<T> extends BaseResponse {
    data: {
        entity?: T;
    };
}
export interface ListResponse<T> extends BaseResponse {
    data: {
        list: T[];
        recordsTotal?: number;
    };
}
