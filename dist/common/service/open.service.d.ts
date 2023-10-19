import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { EnvConfigDTO } from 'src/common/types/config';
export declare class OpenApiService {
    private configService;
    constructor(configService: ConfigService<EnvConfigDTO>);
    getToken(): Promise<import("axios").AxiosResponse<any, any>>;
    batchRequest(tasks: any, max?: number): Promise<any[]>;
    request(requestBody: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
}
