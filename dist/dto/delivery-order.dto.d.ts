interface Item {
    id: string;
    rootItemId: string;
    itemId: string;
    newRootItemId: string;
    newItemId: string;
    name: string;
    unit: string;
    type: string;
    category: string;
    code: string;
    imageUrl: string;
    comments: string;
    attributes: any;
    itemSpecifications: any[];
    costPrice: number;
    cost_price: number;
    price: number;
    shelfLife: number;
    taxRate: number;
    tax_rate: number;
    defectiveRate: number;
    categoryId: number;
    isConfigurable: number;
    unitId: number;
    useSN: boolean;
    itemType: number;
    overStock: boolean;
    default_warehouse: DefaultWarehouse;
    defaultWarehouse: DefaultWarehouse;
    defaultWarehouseBin: string;
    hasProcurementInspection: boolean;
    allowProduction: number;
    allowPurchase: number;
    allowSale: number;
    useStockBatch: number;
    useBomVersion: number;
    supplyChain: SupplyChain;
    productRootItemIdOriginal: string;
    inventoryUnit: InventoryUnit;
    saleUnit: InventoryUnit;
    assistUnit: string;
    itemSpecificationStr: string;
}
interface CustomerAddressInfo {
    id: number;
    customerLabel: string;
    receivePeople: string;
    callingCode: string;
    contact: string;
    address: string;
    country: string;
    province: string;
    city: string;
    district: string;
    phone: string;
}
interface CustomerLevel {
    id: number;
    name: string;
    code: string;
    discount: number;
    system_defalut: boolean;
}
interface DefaultWarehouse {
    id: number;
    name: string;
    comments: string;
    system_default: boolean;
    warehouse_type: number;
    warehouseBinOpened: boolean;
    warehouseBins: any[];
    stockBatches: any[];
}
interface EnterpriseItem {
    productId: number;
    orderType: number;
    enterpriseItemCode: string;
    enterpriseItemDesc: string;
    comments: string;
}
interface ExtendedFields {
    id: number;
    fieldId: number;
    name: string;
    value: string;
    valueId: string;
    fieldType: number;
    required: number;
    sort: number;
}
interface InventoryUnit {
    baseUnitId: number;
    unitId: number;
    unitName: string;
    unitToBaseRatio: number;
    baseToUnitRatio: number;
    empty: boolean;
}
interface PurchaseParam {
    purchasePrice: number;
    purchaseTax: number;
    overReceiveRate: number;
    baseUnitId: number;
    purchaseUnitId: number;
    purchaseUnitName: string;
    baseToPurchaseQuantity: number;
    purchaseToBaseQuantity: number;
    purchasePriceList: string;
}
interface Records {
    id: number;
    comment: string;
    currency: number;
    customerOrderNumber: string;
    deadLine: string;
    customerRequestDeadLine: string;
    exchangeRate: number;
    isAudited: number;
    isDeleted: number;
    itemId: string;
    itemCode: string;
    itemName: string;
    orderId: number;
    orderNumber: string;
    outQuantity: number;
    price: number;
    lastPrice: number;
    originPrice: number;
    processStatus: number;
    quantity: number;
    returnQuantity: number;
    taxRate: number;
    totalTaxPrice: number;
    baseCurrencyTotalTaxPrice: number;
    updateTime: number;
    recordStatus: number;
    excludeTaxPrice: number;
    discount: number;
    discountPrice: number;
    noTaxDiscountPrice: number;
    hasSpecialPrice: boolean;
    specialPrice: number;
    noTaxSpecialPrice: number;
    totalSpecialNoTaxPrice: number;
    totalSpecialTaxPrice: number;
    totalDiscountNoTaxPrice: number;
    totalDiscountTaxPrice: number;
    totalNoTaxPrice: number;
    outDiscountTaxPrice: number;
    extendedFields: ExtendedFields[];
    orderExtendedFields: ExtendedFields[];
    taxPrice: number;
    totalPriceWithTax: number;
    outBatchId: number;
    enterpriseItem: EnterpriseItem;
    warehouseId: number;
    warehouseBinId: number;
    orderProductId: number;
    saleUnit: InventoryUnit;
    warehouseName: string;
    warehouseBinName: string;
    bomVersion: string;
    applyRecordTotalDiscountPrice: number;
    customFields: Record<string, any>;
    orderQuantity: number;
    orderAppliedOutQuantity: number;
    orderReturnQuantity: number;
    returnExchangeQuantity: number;
    sort: number;
}
interface DeliveryOrder {
    deliveryCompany: string;
    deliveryCompanyId: string;
    deliveryOrderId: string;
    deliveryTime: string;
    batchId: number;
    comment: string;
    logisticsNumber: string;
    customerId: number;
    customerName: string;
    deleteReason: string;
    isMergeBatch: number;
    items: Record<string, Item>;
    outBatchMoney: number;
    outApplyMoney: number;
    outTotalDiscountTaxPrice: number;
    outTotalRealTaxPrice: number;
    outInventoryProcess: string[];
    records: Records[];
    customerAddressInfo: CustomerAddressInfo;
    processStatus: number;
    attachment: any[];
    updateTime: number;
    recordStatus: number;
    documentStatus: number;
    sendStatus: number;
    auditStatus: number;
    rejectStatus: number;
    itemDtos: string;
    isReturnBatch: number;
    id: number;
    dataId: string;
    customerCode: string;
    customerLevel: CustomerLevel;
    currency: string;
    createTime: string;
    creatorName: string;
}
interface SaleParam {
    salePrice: number;
    saleTax: number;
    overDeliveryRate: number;
    baseUnitId: number;
    saleUnitId: number;
    saleUnitName: string;
    baseToSaleQuantity: number;
    saleToBaseQuantity: number;
    salePriceList: string;
}
interface SupplyChain {
    purchaseParam: PurchaseParam;
    saleParam: SaleParam;
    isConfigurable: number;
}
