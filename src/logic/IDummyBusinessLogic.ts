import { IBusinessLogic } from 'pip-services-runtime-node';
import { DataPage } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

export interface IDummyBusinessLogic extends IBusinessLogic {
    getDummies(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any);
    getDummyById(correlationId: string, dummyId: string, callback: any);
    createDummy(correlationId: string, dummy: any, callback: any);
    updateDummy(correlationId: string, dummyId: string, dummy: any, callback: any);
    deleteDummy(correlationId: string, dummyId: string, callback: any);
}
