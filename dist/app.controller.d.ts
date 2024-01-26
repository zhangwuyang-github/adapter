import { AppService } from './service/app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    postHello(body: {
        word: string;
    }): any;
    getEnvConfig(): Promise<{
        code: number;
        data: {
            entity: any;
            token: string;
        };
    }>;
}
