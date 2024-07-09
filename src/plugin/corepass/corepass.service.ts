import { Injectable } from '@nestjs/common';
import { fromPairs } from 'lodash';
import {
  BaseResponse,
  EntityResponse,
  ListResponse,
} from 'src/common/types/response';
import {
  SearchEssentialBody,
  fetchCorePaasDetailParams,
  upsertParams,
} from 'src/common/types/cps';
import { OpenApiService } from '../open-api/open-api.service';
import { AxiosResponse } from 'axios';

@Injectable()
export class CorepassService {
  constructor(private openApiService: OpenApiService) {}

  formatFetchCpsDetailParams(
    data: SearchEssentialBody,
  ): fetchCorePaasDetailParams {
    if (!data.childTemplateApiNameArr?.length) {
      return {
        templateApiName: data?.templateApiName,
        dataIds: [data?.dataId],
      };
    }
    const child = fromPairs(
      data.childTemplateApiNameArr?.map((api) => [api, {}]),
    );

    return {
      templateApiName: data?.templateApiName,
      dataIds: [data?.dataId],
      join: {
        joinTables: child,
        flat: false,
      },
    };
  }

  callCpsWebhook(params: {
    uuid: string;
    data: any;
  }): Promise<{ data: BaseResponse }> {
    return this.openApiService.request({
      url: `/api/metadata-flow/trigger/webhook/${params?.uuid}`,
      method: 'post',
      data: params?.data,
    });
  }

  /** 获取cps列表，若fuzzy为false，则可以实现精确匹配 */
  fetchList<T = any>(
    templateApiName: string,
    pagination: { current: number; pageSize: number },
    filter?: any,
    fuzzy?: boolean,
  ): Promise<AxiosResponse<ListResponse<T>>> {
    return this.openApiService.request({
      url: '/api/metadata-app/v2/data/query/search',
      method: 'post',
      data: {
        body: {
          filter: filter || {},
          start: (pagination?.current - 1) * pagination?.pageSize,
          length: pagination?.pageSize,
          templateApiName,
          fuzzy: typeof fuzzy === 'boolean' ? fuzzy : true,
        },
      },
    });
  }

  fetchDetail<T = any>(
    params: fetchCorePaasDetailParams,
  ): Promise<AxiosResponse<EntityResponse<T>>> {
    return this.openApiService.request({
      url: '/api/metadata-app/v2/data/query/details',
      method: 'post',
      data: {
        body: params,
      },
    });
  }

  /** 获取单条cps数据详情 */
  async singleDetail<T = any>(
    params: SearchEssentialBody,
  ): Promise<EntityResponse<T>> {
    const resp = await this.fetchDetail(
      this.formatFetchCpsDetailParams(params),
    );
    if (resp?.data?.code !== 200) {
      return resp?.data;
    }
    const detail = resp?.data?.data?.entity?.data?.[0];
    if (!detail) {
      return {
        code: 500,
        message: '查询CorePaas表单详情报错',
        data: {},
      };
    }
    return {
      code: 200,
      message: '查询成功',
      data: {
        entity: detail,
      },
    };
  }

  /** 批量删除cps单据 */
  async batchDelete(params: { templateId: string; dataIds: string[] }) {
    return this.openApiService.request({
      url: '/api/metadata-app/batch/delete',
      method: 'post',
      data: {
        body: params,
      },
    });
  }

  /**
   * cps批量创建/更新
   * 优点：是个同步接口，能实时反馈报错
   * 缺点：相对于配置一个新建的cps的webhook来新增，他的关联表单字段类型需要传各种各样的id
   */
  async upsert(params: upsertParams) {
    return this.openApiService.request({
      url: '/api/metadata-app/v2/data/operation/saveOrUpdate',
      method: 'post',
      data: {
        body: params,
      },
    });
  }
}
