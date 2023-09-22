import { IdAndName } from 'src/types/common';

export interface Unit {
  id: number;
  name: string;
  defaultProductUnit: number;
  defaultMaterialUnit: number;
  defaultSemiProductUnit: number;
  unitRelations: any[];
  updateTime: number;
  deleted: number;
}

export interface ItemUnit {
  itemIdOriginal: string;
  baseUnit: Unit;
  inventoryUnit: Unit;
  inventoryToBaseQuantity: number;
  baseToInventoryQuantity: number;
  productionUnit: IdAndName;
  productionToBaseQuantity: number;
  baseToProductionQuantity: number;
  jbkUnit: IdAndName;
  productionToJbkQuantity: number;
  jbkToProductionQuantity: number;
  saleUnit: Unit;
  saleToBaseQuantity: number;
  baseToSaleQuantity: number;
  purchaseUnit: Unit;
  purchaseToBaseQuantity: number;
  baseToPurchaseQuantity: number;
}

export interface Item {
  itemId: string;
  rootItemId: string;
  itemIdOriginal: string;
  rootItemIdOriginal: string;
  name: string;
  code: string;
  baseUnit: string;
  attributes: any;
  category: string;
  imageUrl: string;
  type?: any;
  typeName?: any;
  enableInteger?: any;
  integerWay?: any;
  useSN: number;
  useBatch: boolean;
  isConfigurable?: any;
  allowSale?: any;
  allowPurchase?: any;
  allowProduction?: any;
  itemSpecificationConfigs?: any;
  useBomVersion: number;
  blueprint: any[];
  productionUnit: string;
  jbkUnit: string;
  comments: string;
  baseToProductionQuantity: number;
  productionToBaseQuantity: number;
  itemAssistUnits: any[];
  itemUnit: ItemUnit;
}

export interface Resource {
  assigneeId: number;
  assigneeName?: any;
  assigneeCode?: any;
  assigneeType: number;
  isResource?: boolean;
}

export interface Procedure {
  id: number;
  code: string;
  name: string;
  procedureType: number;
  prepareMaterialType: number;
}

export interface AssistUnitScale {
  baseUnitId?: any;
  unitId?: any;
  unitName?: any;
  unitToBaseRatio?: any;
  baseToUnitRatio?: any;
}

export interface WorpSubstituteGroup {
  id?: any;
  strId?: any;
  workOrderId?: any;
  worpId?: any;
  worpMaterialGroupId?: any;
  worpMaterialType?: any;
  substituteGroupId?: any;
  code?: any;
  name?: any;
  rootItemId?: any;
  bomVersion?: any;
  quantity?: any;
  strategy?: any;
  method?: any;
  way?: any;
  substitutes?: any;
}

export interface PlanMaterial {
  id: number;
  strId: string;
  planMaterialGroupId: string;
  substituteId?: any;
  procedure: Procedure;
  workOrderProcedureId: number;
  item: Item;
  bomVersion: string;
  assistUnitScale: AssistUnitScale;
  planQuantity: number;
  assistUnitPlanQuantity: number;
  availableInventoryQuantity: number;
  assistUnitAvailableQuantity: number;
  oweQuantity: number;
  assistUnitOweQuantity: number;
  preparedQuantity: number;
  assistUnitPreparedQuantity: number;
  remainQuantity: number;
  assistUnitRemainQuantity: number;
  returnApplyQuantity: number;
  assistUnitReturnApplyQuantity: number;
  returnConfirmedQuantity: number;
  assistUnitReturnConfirmedQuantity: number;
  supplementApplyQuantity: number;
  assistUnitSupplementApplyQuantity: number;
  supplementConfirmedQuantity: number;
  assistUnitSupplementConfirmedQuantity: number;
  netOutboundQuantity: number;
  assistUnitNetOutboundQuantity: number;
  consumeQuantity: number;
  assistUnitConsumeQuantity: number;
  remark: string;
  changeMaterialStatus: number;
  keyMaterial: number;
  workOrderMaterialConsumeType: number;
  replaceMadeUpSN: number;
  itemRecognizableCode: string;
  defaultBatch: any[];
  defaultWarehouse: IdAndName;
  consumeMaterialLimitType: number;
  auditingQuantity: number;
  assistUnitAuditingQuantity: number;
  sortOrder: number;
  limitQuantity: number;
  distributeOrder: string;
  usingRatio: number;
  planMaterialGroupType: number;
  substituteGroupId: string;
  worpSubstituteGroup: WorpSubstituteGroup;
  substitutePlanMaterials: any[];
}

export interface Wip {
  itemId: string;
  rootItemId: string;
  itemIdOriginal: string;
  rootItemIdOriginal: string;
  name: string;
  code: string;
  baseUnit: string;
  attributes: any;
  category: string;
  imageUrl: string;
  type: number;
  typeName?: any;
  enableInteger?: any;
  integerWay?: any;
  useSN?: any;
  useBatch?: any;
  isConfigurable: number;
  allowSale?: any;
  allowPurchase?: any;
  allowProduction?: any;
  itemSpecificationConfigs?: any;
  useBomVersion?: any;
  unit: Unit;
  productionUnit: IdAndName;
  jbkUnit: IdAndName;
  productionToBaseQuantity: number;
  baseToProductionQuantity: number;
  productionToJbkQuantity: number;
  jbkToProductionQuantity: number;
  itemAssistUnits: any[];
}

export interface SelfInspectPlan {
  id: number;
  type: number;
  name: string;
  allInspect: number;
  headInspect: number;
  lastInspect: number;
  samplingInspect: number;
  headInspectTypes: any[];
  headInspectQuantity: number;
  lastInspectQuantity: number;
  samplingInspectPercent: number;
  samplingInspectQuantity: number;
  samplingInspectType: number;
  samplingInspectPercentType: number;
  samplingInspectCreateMethod: number;
  samplingInspectRange: number;
  samplingInspectRangeQuantity: number;
  samplingInspectRangeLot: number;
  inspectGenerateMode: number;
  limitFlow: number;
}

export interface InspectStandardDetail {
  id: number;
  inspectStandardId?: any;
  qualityId?: any;
  qualityName: string;
  inspectStandardName?: any;
  qualityCategoryId?: any;
  dataType: number;
  requirements: string;
  dataValue: string;
  isMultiterm: number;
  createTime?: any;
  isRequired: number;
}

export interface SelfInspectStandard {
  id: number;
  name: string;
  attachment?: any;
  defects?: any;
  inspectStandardDetails: InspectStandardDetail[];
  inspectStandardParameters?: any;
}

export interface PiecePrice {
  id?: any;
  procedureId?: any;
  rootItemId?: any;
  categoryId?: any;
  machineId?: any;
  staffId?: any;
  qualifyPrice: number;
  unQualifyPrice: number;
  selectValueId?: any;
  effectiveDate?: any;
  expiredDate?: any;
}

export interface WorkCenter {
  workCenterId: number;
  code: string;
  name: string;
  workShopId: number;
  workShopName: string;
  enableMatchingLotConsumeWip: number;
  enable: number;
  outsourcing: number;
  key: number;
  bottleneckResourceType: number;
}

export interface TaskDetail {
  worpTaskId: number;
  startTime: number;
  endTime: number;
  quantity: number;
  bottleneckResources: Resource[];
  otherResources: Resource[];
}

export interface Proces {
  worpPlanQty?: any;
  productiveQty?: any;
  jobBookingQty?: any;
  lostQty?: any;
  selfInspectPlanQty?: any;
  selfInspectJobBookingQty?: any;
  selfInspectProductiveQty?: any;
  selfInspectQualifyQty?: any;
  selfInspectConcessionQty?: any;
  selfInspectScrapStoreQty?: any;
  selfInspectRepairQty?: any;
  selfOfflineRepairQty?: any;
  selfInspectTempQty?: any;
  specialInspectPlanQty?: any;
  specialInspectJobBookingQty?: any;
  specialInspectProductiveQty?: any;
  specialInspectQualifyQty?: any;
  specialInspectConcessionQty?: any;
  specialInspectScrapStoreQty?: any;
  specialInspectRepairQty?: any;
  specialOfflineRepairQty?: any;
  specialInspectTempQty?: any;
  overdue?: any;
  procedureId?: any;
  repairQty?: any;
  repairWorkstationQty?: any;
}

export interface WorkOrderProcedure {
  workOrderId: number;
  workOrderProcedureId: number;
  nextWorkOrderProcedureId: number;
  nextProcedureId: number;
  procedure: Procedure;
  wip: Wip;
  selfInspect: number;
  specialInspect: number;
  printProcedure: number;
  prepareMaterialType: number;
  selfInspectPlan: SelfInspectPlan;
  selfInspectStandard: SelfInspectStandard;
  specialInspectPlan?: any;
  specialInspectStandard?: any;
  specialInspectAssignees: any[];
  specialInspectAssigneeType?: any;
  overdue: number;
  requirement: string;
  piecePrice: PiecePrice;
  prepareTimeUnit: number;
  prepareTime: number;
  processTime: number;
  processUnit: number;
  designDiagrams: any[];
  warehousing: number;
  divideWork: number;
  workCenter: WorkCenter;
  envs: any[];
  taskDetails: TaskDetail[];
  process: Proces;
  activityId: number;
  worpActivityId: number;
  operated: number;
  insertBefore: number;
  distributed: number;
  productionUnit: IdAndName;
  jbkUnit: IdAndName;
  jbkUnitToProductionUnitQty: number;
  productionUnitToJbkUnitQty: number;
  allowableErrorRange: number;
  unitConvert: number;
  enableProcedureMaterialKitting: number;
  procedureType: number;
  lock: number;
  inspectPlanStandards: any[];
  lotCarFlowType: number;
  snProductionProcedure: number;
  snProductionType: number;
  snProductionImportType: number;
  snReplaceProcedure: number;
  snReplaceType: number;
  snPrintProcedure: number;
  snSingletonProcedure: number;
  snIds: any[];
  limitType: number;
  snCompareProcedure: number;
  snCompareQty: number;
  snCompareType: number;
  isOpenTaskLimit: number;
  usingTaskPlanPrepare: number;
  printTemplateIds: any[];
  extendField?: any;
  consumptionMaterialMode: number;
  flowBatchSize: number;
}

export interface ItemBom {
  bomId: string;
  level: number;
  item: Item;
  allowPurchase: boolean;
  allowProduction: boolean;
  childItems: ItemBom[];
}

export interface WorkOrderDetail {
  id: number;
  number: string;
  productionWarehouseId: number;
  productionWarehouseName: string;
  baseUnitPlanQty: number;
  productionUnitPlanQty: number;
  baseUnitQualifiedPlanQty?: any;
  productionUnitQualifiedPlanQty?: any;
  productionUnit: IdAndName;
  baseUnit: Unit;
  baseUnitToProductionUnitQty: number;
  productionUnitToBaseUnitQty: number;
  assistUnit: IdAndName;
  baseUnitToAssistUnitQty: number;
  assistUnitToBaseUnitQty: number;
  assistUnitPlanQty: number;
  assistUnitQualifiedPlanQty: number;
  workOrderStatus: number;
  item: Item;
  bomVersion: string;
  itemRemark: string;
  assigneeType: number;
  assignee: Resource;
  procedureResourceId: number;
  routingProcessName: string;
  procedureResourceType: number;
  planMaterialRemark: string;
  voidReason?: any;
  voidOperator?: any;
  voidTime?: any;
  startTime: number;
  endTime: number;
  orders: any[];
  workOrderConcatOrderProducts: any[];
  planMaterials: PlanMaterial[];
  workOrderProcedures: WorkOrderProcedure[];
  repairWorkOrderProcedures?: any;
  repairRelations?: any;
  repairTotals?: any;
  itemBom: ItemBom;
  bomItemSpecifications: any[];
  sourceWorkOrder?: any;
  orderProductId: number;
  hasCoProductOrder: number;
  hasRepairWorkstation: number;
  hasRepairRecord: number;
  workOrderType: number;
  finishReason: string;
  productionBatchCodeId: number;
  productionBatchCodeNumber: string;
  snProduction: number;
  snParallel: number;
  isOpenJbkLimit: string;
  packingStrategyId: string;
  auditStatus: number;
  isReject: number;
  gradeSort: number;
  newWorkshopPlan: number;
  spec: { [key: string]: any };
  extendField: { [key: string]: any };
  routingExtendField: { [key: string]: any };
}
