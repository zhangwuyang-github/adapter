import { Controller, Get, Post, HttpCode } from '@nestjs/common';

@Controller('/api/datasync')
export class AppController {
  /** 最好保留，用于指针探活 */
  @Get('/getHello')
  getHello(): string {
    return 'hello';
  }

  @HttpCode(200)
  @Post('/postHello')
  postHello() {
    return 'hello';
  }
}
