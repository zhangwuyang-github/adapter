import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { EnvConfig } from 'src/types/common';
export declare class OpenApiService {
    private configService;
    constructor(configService: ConfigService<EnvConfig>);
    getToken(): Promise<import("axios").AxiosResponse<any, any>>;
    batchRequest(tasks: any, max?: number): Promise<any[]>;
    request(requestBody: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
}
