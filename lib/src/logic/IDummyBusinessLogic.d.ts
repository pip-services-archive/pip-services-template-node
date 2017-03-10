import { IBusinessLogic } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
export interface IDummyBusinessLogic extends IBusinessLogic {
    getDummies(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): any;
    getDummyById(correlationId: string, dummyId: string, callback: any): any;
    createDummy(correlationId: string, dummy: any, callback: any): any;
    updateDummy(correlationId: string, dummyId: string, dummy: any, callback: any): any;
    deleteDummy(correlationId: string, dummyId: string, callback: any): any;
}
