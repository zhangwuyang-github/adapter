/**
 * 单条获取cps详情接口最少的参数
 */
export interface SearchEssentialBody {
  dataId: string;
  templateApiName: string;
  childTemplateApiNameArr?: string[];
}

export interface fetchCorePaasDetailParams {
  templateApiName: string;
  dataIds: string[];
  join?: {
    joinTables: { [key: string]: any };
    flat: false;
  };
}

interface UpsertContent {
  id?: string; // 如果传id就默认是更新，不传默认是新增
  parent?: {
    // 是否需要和某个父表进行绑定
    templateApiName: string; // 父表apiName
    id: string; // 父表单据id
  };
  /**
   * 单据字段详情
   * 注意点：
   * 数字类型：注意cps默认两位小数点，超过会单据保存校验失败
   * 选项类型：要传选项的值，而非选项的名
   * 关联表单类型：{ id: string }; 传对应单据的id组成一个对象类型
   */
  value: { [key: string]: any };
  version?: number; // 数据版本，传的话就是更新
  children?: { [key: string]: UpsertContent[] };
}

/**
 * cps upsert接口参数
 */
export interface UpsertParams {
  templateApiName: string; // 单据apiName
  contents: UpsertContent[]; // 新建/修改的单据
}
