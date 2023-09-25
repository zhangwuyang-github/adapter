export interface fetchWorkOrderListParams {
    startTime: number;
    endTime: number;
    creatorIds: number[];
    assigneeParams: string[];
    paginationParam: {
        start: number;
        length: number;
    };
    productionQtyParams: string[];
    itemSearchParam: {
        filters: string[];
        name: string;
        attribute: string;
    };
    status: number[];
    timeType: number;
    workOrderNumber: string;
}
