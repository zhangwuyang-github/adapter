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
