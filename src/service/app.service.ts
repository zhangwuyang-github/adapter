import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenApiService } from 'src/common/service/open.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly openService: OpenApiService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getConfig() {
    const config = this.configService.get('http');
    const token = await this.openService.getToken();

    return {
      code: 200,
      data: {
        entity: config,
        token: token,
      },
    };
  }
}
