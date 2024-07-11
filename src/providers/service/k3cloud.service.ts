import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  Configuration,
  K3CloudConfig,
} from 'src/configuration/configuration.interface';
import { BusinessException } from 'src/filter/biz.exception';

@Injectable()
export class K3cloudService {
  private readonly logger = new Logger(K3cloudService.name);

  constructor(private configService: ConfigService<Configuration>) {}

  async getToken(): Promise<string> {
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
  async request(requestBody: AxiosRequestConfig) {
    const cookie = await this.getToken();
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

  /** response转换 */
  private responseValidate<T>(response: AxiosResponse<T>, entityR = false) {
    if (response?.status !== 200) {
      const errorMessage = `「ERP接口: ${response?.config?.url}」「入参: ${
        response?.config?.params
          ? JSON.stringify(response?.config.params)
          : JSON.stringify(response?.config?.data || '')
      }」响应: response http status !== 200`;
      this.logger.error(errorMessage);
      throw new BusinessException(errorMessage);
    }

    let errors = response.data?.[0]?.[0]?.Result?.ResponseStatus?.Errors;
    if (entityR) {
      errors = (response.data as any)?.Result?.ResponseStatus?.Errors;
    }

    if (errors?.length) {
      const errorMessage = `接口: ${response?.config?.url}」「入参: ${
        response?.config.params || response?.config?.data
      }」响应: ${JSON.stringify(errors)}`;

      this.logger.error(errorMessage);

      const returnMessage = errors?.map((v) => v?.Message)?.join(';');
      throw new BusinessException(`ERP接口报错：${returnMessage}`);
    }
    return response?.data;
  }

  // 查询金蝶列表
  async list(body: {
    formId: string;
    data: {
      FormId: string;
      FieldKeys: string;
      FilterString: any[];
      OrderString: string;
      TopRowCount: number;
      StartRow: number;
      Limit: number;
      SubSystemId: string;
    };
  }) {
    return this.responseValidate(
      await this.request({
        url: '/Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.ExecuteBillQuery.common.kdsvc',
        method: 'post',
        data: body,
      }),
    );
  }

  // 查询金蝶单据详情, code/id必传一个
  async detail<T = any>(
    form: string,
    code?: string,
    Id?: string,
  ): Promise<AxiosResponse<{ Result: { Result: T } }>> {
    return this.responseValidate(
      await this.request({
        url: '/Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.View.common.kdsvc',
        method: 'post',
        data: {
          formid: form,
          data: {
            formId: form,
            CreateOrgId: 0,
            Number: code,
            Id: Id || '',
            IsSortBySeq: 'false',
          },
        },
      }),
      true,
    );
  }

  // 创建金蝶单据
  async create(body: { formId: string; data: any }) {
    return this.responseValidate(
      await this.request({
        url: '/Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Save.common.kdsvc',
        method: 'post',
        data: body,
      }),
      true,
    );
  }
}
