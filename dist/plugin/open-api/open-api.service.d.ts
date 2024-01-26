import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { Cache } from 'cache-manager';
import { EnvConfigDTO } from 'src/common/types/config';
export declare class OpenApiService {
    private configService;
    private cacheManager;
    constructor(configService: ConfigService<EnvConfigDTO>, cacheManager: Cache);
    getToken(): Promise<string>;
    batchRequest(tasks: any, max?: number): Promise<any[]>;
    request(requestBody: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
}
