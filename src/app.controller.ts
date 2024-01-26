import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** 最好保留，用于指针探活 */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/datasync/hello')
  postHello(@Body() body: { word: string }) {
    return this.appService.postHello(body);
  }

  @Get('/api/getEnvConfig')
  getEnvConfig() {
    const resp = this.appService.getConfig();
    return resp;
  }
}
