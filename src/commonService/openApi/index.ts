import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import { EnvConfig } from 'src/types/common';

@Injectable()
export class OpenApiService {
  constructor(private configService: ConfigService<EnvConfig>) {}

  /** 获取MES Token */
  async getToken() {
    const host = this.configService.get('HOST');
    const appKey = this.configService.get('APP_KEY');
    const appSecret = this.configService.get('APP_SECRET');

    const resp = await axios({
      url: `${host}/api/open/v2/token`,
      method: 'post',
      data: {
        body: {
          appKey,
          appSecret,
        },
      },
    });

    return resp;
  }

  /** 异步请求队列 */
  async batchRequest(tasks, max?: number) {
    max = max || 3;
    const results = [];
    let together = new Array(max).fill(null);
    let index = 0;

    together = together.map(() => {
      return new Promise<void>((resolve, reject) => {
        const run = () => {
          if (index >= tasks.length) {
            resolve();
            return;
          }
          const oldIndex = index;
          const task = tasks[index++];

          task()
            .then((result) => {
              results[oldIndex] = result;
              run();
            })
            .catch((error) => {
              reject(error);
            });
        };
        run();
      });
    });

    await Promise.all(together);
    return results;
  }

  /** MES request */
  async request(requestBody: AxiosRequestConfig) {
    const tokenResp = await this.getToken();
    const token = tokenResp?.data?.data?.accessToken;
    const host = this.configService.get('HOST');

    return axios({
      url: `${host}${requestBody?.url}`,
      method: requestBody?.method,
      data: requestBody?.data,
      headers: {
        Authorization: token,
      },
    });
  }
}
