import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import {
  Configuration,
  K3WiseConfig,
} from 'src/configuration/configuration.interface';

@Injectable()
export class K3wiseService {
  constructor(private configService: ConfigService<Configuration>) {}

  async getToken(): Promise<string> {
    const config = this.configService.get('http');
    const k3wiseConfig: K3WiseConfig = config.k3wise;
    const { host, authorityCode } = k3wiseConfig;

    const resp = await axios({
      method: 'get',
      url: `${host}/K3API/Token/Create?authorityCode=${authorityCode}`,
    });
    return resp?.data?.Data?.Token;
  }

  /** 金蝶K3Wise request */
  async request(requestBody: AxiosRequestConfig) {
    const token = await this.getToken();
    const config = this.configService.get('http');
    const k3wiseConfig: K3WiseConfig = config.k3wise;
    const { host } = k3wiseConfig;

    return axios({
      url: `${host}${requestBody?.url}?token=${token}`,
      method: requestBody?.method,
      data: requestBody?.data,
    });
  }
}
