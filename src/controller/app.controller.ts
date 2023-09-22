import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  /** 最好保留，用于指针探活 */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/datasync/hello')
  postHello(@Body() body: { word: string }) {
    this.logger.log('指针探活', body);
    return {
      code: 200,
      message: '成功啦',
      data: {
        entity: body,
      },
    };
  }
}
