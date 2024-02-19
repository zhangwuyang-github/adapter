import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenApiService } from 'src/plugin/open-api/open-api.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly openService: OpenApiService,
  ) {}

  private logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  postHello(body) {
    return body || 'Hello World!';
  }

  async getConfig() {
    const config = this.configService.get('http');
    const token = await this.openService.getToken();

    this.logger.log('token: ', (token as any).d.d.d);

    return {
      code: 200,
      data: {
        entity: config,
        token: token,
      },
    };
  }
}
