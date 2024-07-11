import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import {
  ChanJetConfig,
  Configuration,
  K3WiseConfig,
} from 'src/configuration/configuration.interface';

@Injectable()
export class ErpService {
  constructor(private configService: ConfigService<Configuration>) {}

  async getChanJetToken(): Promise<string> {
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
  async chanJetRequest(requestBody: AxiosRequestConfig) {
    try {
      const token = await this.getChanJetToken();
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
    } catch (error) {
      return error;
    }
  }

  async getK3WiseToken(): Promise<string> {
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
  async k3WiseRequest(requestBody: AxiosRequestConfig) {
    const token = await this.getK3WiseToken();
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
