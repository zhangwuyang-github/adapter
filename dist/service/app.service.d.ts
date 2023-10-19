import { ConfigService } from '@nestjs/config';
import { OpenApiService } from 'src/common/service/open.service';
export declare class AppService {
    private readonly configService;
    private readonly openService;
    constructor(configService: ConfigService, openService: OpenApiService);
    getHello(): string;
    getConfig(): Promise<{
        code: number;
        data: {
            entity: any;
            token: string;
        };
    }>;
}
