import { AppService } from '../service/app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly logger;
    getHello(): string;
    postHello(body: {
        word: string;
    }): {
        code: number;
        message: string;
        data: {
            entity: {
                word: string;
            };
        };
    };
    getEnvConfig(): Promise<{
        code: number;
        data: {
            entity: any;
        };
    }>;
}
