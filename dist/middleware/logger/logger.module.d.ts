import { LoggerService } from './logger.service';
export declare class LoggerModule {
    static forRoot(): {
        global: boolean;
        module: typeof LoggerModule;
        providers: (typeof LoggerService)[];
        exports: (typeof LoggerService)[];
    };
}
