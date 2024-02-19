import { ConfigService } from '@nestjs/config';
import { OpenApiService } from 'src/plugin/open-api/open-api.service';
export declare class AppService {
    private readonly configService;
    private readonly openService;
    constructor(configService: ConfigService, openService: OpenApiService);
    private logger;
    getHello(): string;
    postHello(body: any): any;
    getConfig(): Promise<{
        code: number;
        data: {
            entity: any;
            token: string;
        };
    }>;
}
