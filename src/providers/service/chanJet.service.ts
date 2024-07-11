import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import {
  ChanJetConfig,
  Configuration,
} from 'src/configuration/configuration.interface';

@Injectable()
export class ChanJetService {
  constructor(private configService: ConfigService<Configuration>) {}

  async getToken(): Promise<string> {
    const config = this.configService.get('http');
    const chanJetConfig: ChanJetConfig = config.chanJet;
    const { host, key, secret, refreshToken } = chanJetConfig;

    const resp = await axios({
      headers: {
        appKey: key,
        appSecret: secret,
        ['Content-Type']: 'application/json',
      },
      url: `${host}/auth/v2/refreshToken?grantType=refresh_token&refreshToken=${refreshToken}`,
      method: 'get',
    });
    return resp?.data?.result?.access_token || '';
  }

  /** 畅捷通request */
  async request(requestBody: AxiosRequestConfig) {
    const token = await this.getToken();
    const config = this.configService.get('http');
    const chanJetConfig: ChanJetConfig = config.chanJet;
    const { host, key, secret } = chanJetConfig;

    return axios({
      headers: {
        appKey: key,
        appSecret: secret,
        openToken: token,
        ['Content-Type']: 'application/json',
      },
      url: `${host}${requestBody?.url}`,
      method: requestBody?.method,
      data: requestBody?.data,
    });
  }
}
