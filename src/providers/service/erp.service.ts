import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import {
  ChanJetConfig,
  Configuration,
  K3CloudConfig,
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

  async getK3CloudToken(): Promise<string> {
    const config = this.configService.get('http');
    const k3cloudConfig: K3CloudConfig = config.k3cloud;
    const { host, acctid, key, secret, lcid } = k3cloudConfig;

    const resp = await axios({
      url: `${host}/Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser.common.kdsvc`,
      method: 'post',
      data: {
        acctID: acctid,
        username: key,
        password: secret,
        lcid: lcid,
      },
    });
    const cookies = resp?.headers['set-cookie'];
    const cookie = cookies?.find((c) => c.includes('kdservice-sessionid'));
    return cookie;
  }

  /** 金蝶K3Cloud request */
  async k3CloudRequest(requestBody: AxiosRequestConfig) {
    const cookie = await this.getK3CloudToken();
    const config = this.configService.get('http');
    const k3cloudConfig: K3CloudConfig = config.k3cloud;
    const { host } = k3cloudConfig;

    return axios({
      url: `${host}${requestBody?.url}`,
      method: requestBody?.method,
      data: requestBody?.data,
      headers: {
        Cookie: cookie,
      },
    });
  }
}
