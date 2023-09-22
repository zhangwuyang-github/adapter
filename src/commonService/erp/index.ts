import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import { EnvConfig } from '../openApi/type';

@Injectable()
export class ErpService {
  constructor(private configService: ConfigService<EnvConfig>) {}

  async getChanJetToken(): Promise<string> {
    const host = this.configService.get('HOST_CHANJET');
    const key = this.configService.get('KEY_CHANJET');
    const secret = this.configService.get('SECRET_CHANJET');
    const authorityCode = this.configService.get('AUTHORITY_CODE_CHANJET');

    const resp = await axios({
      headers: {
        appKey: key,
        appSecret: secret,
        ['Content-Type']: 'application/json',
      },
      url: `${host}/auth/v2/refreshToken?grantType=refresh_token&refreshToken=${authorityCode}`,
      method: 'get',
    });
    return resp?.data?.result?.access_token || '';
  }

  /** 畅捷通request */
  async chanJetRequest(requestBody: AxiosRequestConfig) {
    try {
      const token = await this.getChanJetToken();
      const host = this.configService.get('HOST_CHANJET');
      const key = this.configService.get('KEY_CHANJET');
      const secret = this.configService.get('SECRET_CHANJET');

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
    const host = this.configService.get('HOST_K3WISE');
    const k3AuthorityCode = this.configService.get('AUTHORITY_CODE_K3WISE');

    const resp = await axios({
      method: 'get',
      url: `${host}/K3API/Token/Create?authorityCode=${k3AuthorityCode}`,
    });
    return resp?.data?.Data?.Token;
  }

  /** 金蝶K3Wise request */
  async k3WiseRequest(requestBody: AxiosRequestConfig) {
    const token = await this.getK3WiseToken();
    const host = this.configService.get('HOST_K3WISE');

    return axios({
      url: `${host}${requestBody?.url}?token=${token}`,
      method: requestBody?.method,
      data: requestBody?.data,
    });
  }

  async getK3CloudToken(): Promise<string> {
    const host = this.configService.get('HOST_K3CLOUD');
    const acctID = this.configService.get('ACCTID_K3CLOUD');
    const username = this.configService.get('KEY_K3CLOUD');
    const password = this.configService.get('SECRET_K3CLOUD');
    const lcid = this.configService.get('LCID_K3CLOUD');

    const resp = await axios({
      url: `${host}/Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser.common.kdsvc`,
      method: 'post',
      data: {
        acctID,
        username,
        password,
        lcid,
      },
    });
    const cookies = resp?.headers['set-cookie'];
    const cookie = cookies?.find((c) => c.includes('kdservice-sessionid'));
    return cookie;
  }

  /** 金蝶K3Cloud request */
  async k3CloudRequest(requestBody: AxiosRequestConfig) {
    const host = this.configService.get('HOST_K3CLOUD');
    const cookie = await this.getK3CloudToken();

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
