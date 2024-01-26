interface Customer {
  id: number;
  customerName: string;
  customerCode: string;
  customerCategoryName: string;
  customerCurrency: number;
}

interface CustomerAddressInfo {
  addressId: number;
  customerLabel: string;
  receivePeople: string;
  callingCode: string;
  contact: string;
  fax: string;
  address: string;
  country: string;
  province: string;
  city: string;
  district: string;
}

interface Invoice {
  invoiceType: number;
  invoiceStatus: number;
  notAuditInvoiceQuantity: number;
  auditedInvoiceQuantity: number;
}

interface SaleOrder {
  orderId: number;
  orderNumber: string;
  customerOrderNumber: string;
  shareId: number;
  saleStaff: SaleStaff;
  director: SaleStaff;
  isUrgent: number;
  documentStatus: number;
  auditStatus: number;
  sendStatus: number;
  newReturnStatus: number;
  enableReceiptAudit: number;
  priceType: number;
  auditOperation: string;
  customer: Customer;
  createTime: number;
  customerAddressInfo: CustomerAddressInfo;
  currency: number;
  exchangeRate: number;
  department: string;
  productionStatus: number;
  deadLine: number;
  customerRequestDeadLine: string;
  hasMoreDeadLine: boolean;
  rejectStatus: number;
  tags: any[];
  comments: string;
  extendedFields: string;
  attachFiles: any[];
  orderExtraPriceList: any[];
  hasDiscount: boolean;
  hasSpecialPrice: number;
  couponPrice: number;
  baseCurrencyCouponPrice: number;
  outInventoryTotalMoney: number;
  paidPrice: number;
  realPrice: number;
  baseCurrencyOutInventoryTotalMoney: number;
  baseCurrencyPaidPrice: number;
  baseCurrencyRealPrice: number;
  baseCurrencySpecialPrice: string;
  totalTaxMoney: string;
  isAllBatchAudit: boolean;
  hasMergeBatch: boolean;
  orderStatus: number;
  payCondition: string;
  invoice: Invoice;
  hasReturn: boolean;
  createClient: number;
  receivingStatus: number;
  totalReturnPrice: number;
  products: string;
  pricePermission: boolean;
  auditProcessId: number;
  auditProcessName: string;
  sendSign: number;
  newReturnSign: number;
  priceEntryType: number;
  orderType: number;
}

interface SaleStaff {
  id: number;
  name: string;
}
