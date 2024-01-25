import { AppService } from '../service/app.service';
import { CodeSearchService } from 'src/common/plugin/code-search/code-search.service';
export declare class AppController {
    private readonly appService;
    private readonly codeSearchService;
    constructor(appService: AppService, codeSearchService: CodeSearchService);
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
            token: string;
        };
    }>;
    test(body: any): Promise<any>;
}
