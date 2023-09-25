import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { EnvConfig } from 'src/types/common';
export declare class ErpService {
    private configService;
    constructor(configService: ConfigService<EnvConfig>);
    getChanJetToken(): Promise<string>;
    chanJetRequest(requestBody: AxiosRequestConfig): Promise<any>;
    getK3WiseToken(): Promise<string>;
    k3WiseRequest(requestBody: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
    getK3CloudToken(): Promise<string>;
    k3CloudRequest(requestBody: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
}
