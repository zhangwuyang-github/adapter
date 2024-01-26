export interface BaseResponse {
    code: 200 | 500;
    message?: string;
}
export interface EntityResponse<T, Ex = object> extends BaseResponse {
    data: {
        entity?: T;
    } & Ex;
}
export interface ListResponse<T> extends BaseResponse {
    data: {
        list: T[];
        recordsTotal?: number;
    };
}
