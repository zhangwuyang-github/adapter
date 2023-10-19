import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private readonly configService;
    constructor(configService: ConfigService);
    getHello(): string;
    getConfig(): {
        code: number;
        data: {
            entity: any;
        };
    };
}
