import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IDummyPersistence } from './IDummyPersistence';
export declare class DummyFilePersistence extends FilePersistence implements IDummyPersistence {
    /**
     * Unique descriptor for the DummyFilePersistence component
     */
    static Descriptor: ComponentDescriptor;
    constructor(descriptor?: ComponentDescriptor);
    getDummies(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    getDummyById(correlationId: string, dummyId: string, callback: any): void;
    createDummy(correlationId: string, dummy: any, callback: any): void;
    updateDummy(correlationId: string, dummyId: string, dummy: any, callback: any): void;
    deleteDummy(correlationId: string, dummyId: string, callback: any): void;
}
