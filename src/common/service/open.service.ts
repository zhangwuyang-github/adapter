import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import { Cache } from 'cache-manager';
import * as moment from 'moment';
import { EnvConfigDTO, MesConfig } from 'src/common/types/config';

@Injectable()
export class OpenApiService {
  constructor(
    private configService: ConfigService<EnvConfigDTO>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * 获取MES Token
   * 默认过期时间3min
   */
  async getToken(): Promise<string> {
    const ddlTime = 3;

    const cacheToken: {
      accessToken: string;
      ddlTime?: number;
    } = await this.cacheManager.get('mes_cache_token');

    if (cacheToken?.accessToken && cacheToken?.ddlTime > moment().valueOf()) {
      return cacheToken?.accessToken;
    }

    const config = this.configService.get('http');
    const mesConfig: MesConfig = config.mes;
    const { host, appKey, appSecret } = mesConfig;

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

    const newToken = await resp?.data?.data;

    await this.cacheManager.set(
      'mes_cache_token',
      {
        accessToken: newToken?.accessToken,
        ddlTime: moment().add(ddlTime, 'minutes').valueOf(),
      },
      ddlTime * 60 * 1000,
    );

    return newToken?.accessToken;
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
    const token = await this.getToken();
    const config = this.configService.get('http');
    const mesConfig: MesConfig = config.mes;
    const { host } = mesConfig;

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
