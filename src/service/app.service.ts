import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getConfig() {
    const config = this.configService.get('http');

    return {
      code: 200,
      data: {
        entity: config,
      },
    };
  }
}
