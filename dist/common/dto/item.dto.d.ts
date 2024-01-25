interface Attachment {
    album: any[];
    blueprint: any[];
    attachment: any[];
    comments: string;
}
interface BaseUnit {
    id: number;
    name: string;
    defaultProductUnit: number;
    defaultMaterialUnit: number;
    defaultSemiProductUnit: number;
    unitRelations: any[];
    updateTime: number;
    deleted: number;
}
interface Category {
    id: number;
    name: string;
    code: string;
    inventoryCycleDays: number;
    parentId: number;
    parentCategory: string;
    specTemplateId: number;
    specificationTemplate: string;
    level: number;
    updateTime: string;
    deleted: string;
    inventoryAccountType: number;
    snType: number;
    tenantId: string;
    bottomLevel: number;
}
interface Inventory {
    rootItemId: number;
    useBatch: boolean;
    batchType: string;
    useSN: number;
    snType: number;
    useKey: boolean;
    shelfLife: number;
    useOverdueMessage: number;
    useSafetyInventory: boolean;
    maxInventory: number;
    safetyInventory: number;
    minInventory: number;
    rePurchasePoint: number;
    defaultWarehouseId: number;
    defaultWarehouseBin: number;
    defaultWarehouseName: string;
    defaultWarehouseBinName: string;
    abcCategory: number;
    materialStatus: number;
    cost: number;
    realCostPrice: number;
    minPackQuantity: number;
    useLockInventory: boolean;
    inventoryAccountType: number;
    enableInteger: number;
    integerWay: number;
    useBomVersion: boolean;
}
interface ItemCreator {
    staffId: number;
    staffName: string;
    employeeId: string;
}
interface ItemUnitDto {
    itemIdOriginal: string;
    baseUnit: BaseUnit;
    inventoryUnit: BaseUnit;
    inventoryToBaseQuantity: number;
    baseToInventoryQuantity: number;
    productionUnit: BaseUnit;
    productionToBaseQuantity: number;
    baseToProductionQuantity: number;
    jbkUnit: BaseUnit;
    productionToJbkQuantity: number;
    jbkToProductionQuantity: number;
    saleUnit: BaseUnit;
    saleToBaseQuantity: number;
    baseToSaleQuantity: number;
    purchaseUnit: BaseUnit;
    purchaseToBaseQuantity: number;
    baseToPurchaseQuantity: number;
}
interface ProductionAndPlan {
    dailyProduction: number;
    defectiveRate: number;
    planStrategy: number;
    planBatchSize: number;
    batchSize: number;
    incrementSize: number;
    enableInteger: number;
    integerWay: number;
}
interface QualityInspection {
    useProcurementInspect: boolean;
    useInventoryInspect: boolean;
    inspectionMethod: string;
    procurementInspectDetail: string;
}
export interface Item {
    uniqueKey: string;
    errorMsg: string;
    errorCode: number;
    extendErrorInfo: string;
    itemIdOriginal: string;
    rootItemIdOriginal: string;
    name: string;
    code: string;
    type: number;
    category: Category;
    unit: string;
    unitId: number;
    allowSale: boolean;
    allowPurchase: boolean;
    allowProduction: boolean;
    allowOutsource: boolean;
    status: number;
    issueStatus: number;
    auditStatus: number;
    reject: number;
    itemId: number;
    rootItemId: number;
    wipKey: string;
    createTime: number;
    updateTime: string;
    latest: boolean;
    deleted: string;
    nameAttrMd5: string;
    creator: number;
    itemSpecifications: any[];
    productionAndPlan: ProductionAndPlan;
    inventory: Inventory;
    supplyChain: SupplyChain;
    qualityInspection: QualityInspection;
    attachment: Attachment;
    itemUnitDTO: ItemUnitDto;
    itemAssistUnits: any[];
    itemPurchaseInformationDTO: string;
    itemSpecificationConfigs: any[];
    itemCustomizeFields: Record<string, any>;
    customFieldDataUnits: string;
    newVersionItemIdOriginal: string;
    salePriceList: any[];
    hasSalePrice: boolean;
    purchasePriceList: any[];
    hasPurchasePrice: boolean;
    workInProcessList: any[];
    warehouses: Warehouses[];
    warehouseBins: any[];
    routing: string;
    bomId: string;
    itemPurchaser: string;
    itemCreator: ItemCreator;
    longItemId: string;
    newItemId: string;
    newRootItemId: string;
}
interface SupplyChain {
    procurementPriceType: number;
    procurementPrice: number;
    procurementTax: number;
    overReceiveRate: number;
    salePriceType: number;
    salePrice: number;
    saleTax: number;
    overDeliveryRate: number;
    isConfigurable: number;
    purchaser: number;
}
interface Warehouses {
    id: number;
    name: string;
    systemDefault: number;
}
export {};
