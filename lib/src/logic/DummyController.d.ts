import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IDummyBusinessLogic } from './IDummyBusinessLogic';
export declare class DummyController extends AbstractController implements IDummyBusinessLogic {
    /**
     * Unique descriptor for the DummyController component
     */
    static Descriptor: ComponentDescriptor;
    private _db;
    constructor();
    link(components: ComponentSet): void;
    getDummies(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    getDummyById(correlationId: string, dummyId: string, callback: any): void;
    createDummy(correlationId: string, dummy: any, callback: any): void;
    updateDummy(correlationId: string, dummyId: string, dummy: any, callback: any): void;
    deleteDummy(correlationId: string, dummyId: string, callback: any): void;
}
