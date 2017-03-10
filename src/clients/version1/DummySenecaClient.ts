let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { SenecaClient } from 'pip-services-runtime-node';

import { IDummyClient } from './IDummyClient';

export class DummySenecaClient extends SenecaClient implements IDummyClient {       
	/**
	 * Unique descriptor for the DummySenecaClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-dummy", "seneca", "1.0"
	);
    
    constructor() {
        super(DummySenecaClient.Descriptor);
    }
        
    public getDummies(correlationId: string, filter: FilterParams, paging: PagingParams, callback) {
        callback = this.instrument(correlationId, 'dummy.get_dummies', callback);
        
        this.call(
            'dummy', 'get_dummies',
            correlationId,
            {
                filter: filter ? filter.toObject() : null,
                paging: paging ? paging.toObject() : null
            }, 
            callback
        );
    }

    public getDummyById(correlationId: string, dummyId: string, callback: any) {
        callback = this.instrument(correlationId, 'dummy.get_dummy_by_id', callback);
        
        this.call(
            'dummy', 'get_dummy_by_id', 
            correlationId,
            {
                dummy_id: dummyId
            }, 
            callback
        );        
    }

    public createDummy(correlationId: string, dummy: any, callback: any) {
        callback = this.instrument(correlationId, 'dummy.create_dummy', callback);
        
        this.call(
            'dummy', 'create_dummy', 
            correlationId,
            {
                dummy: dummy
            }, 
            callback
        );
    }

    public updateDummy(correlationId: string, dummyId: string, dummy: any, callback: any) {
        callback = this.instrument(correlationId, 'dummy.update_dummy', callback);
        
        this.call(
            'dummy', 'update_dummy', 
            correlationId,
            {
                dummy_id: dummyId,
                dummy: dummy
            }, 
            callback
        );
    }

    public deleteDummy(correlationId: string, dummyId: string, callback) {
        callback = this.instrument(correlationId, 'dummy.delete_dummy', callback);
        
        this.call(
            'dummy', 'delete_dummy',
            correlationId,
            {
                dummy_id: dummyId
            }, 
            callback
        );
    }
    
}
