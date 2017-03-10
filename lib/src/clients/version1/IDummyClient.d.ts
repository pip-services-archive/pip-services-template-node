import { IClient } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
export interface IDummyClient extends IClient {
    getDummies(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    getDummyById(correlationId: string, dummyId: string, callback: any): void;
    createDummy(correlationId: string, dummy: any, callback: any): void;
    updateDummy(correlationId: string, dummyId: string, dummy: any, callback: any): void;
    deleteDummy(correlationId: string, dummyId: string, callback: any): void;
}
