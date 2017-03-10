let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { RestClient } from 'pip-services-runtime-node';

import { IDummyClient } from './IDummyClient';

export class DummyRestClient extends RestClient implements IDummyClient {       
	/**
	 * Unique descriptor for the DummyRestClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-dummy", "rest", "1.0"
	);
    
    constructor() {
        super(DummyRestClient.Descriptor);
    }
        
    public getDummies(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        callback = this.instrument(correlationId, 'dummy.get_dummies', callback);
                       
        let params = {};
        this.addFilterParams(params, filter);
        this.addPagingParams(params, paging);

        this.call('get', 
            '/dummies', 
            correlationId,
            params, 
            callback
        );
    }

    public getDummyById(correlationId: string, dummyId: string, callback: any) {
        callback = this.instrument(correlationId, 'dummy.get_dummy_by_id', callback);
        
        this.call('get', 
            '/dummies/' + dummyId,
            correlationId,
            {}, 
            callback
        );        
    }

    public createDummy(correlationId: string, dummy: any, callback: any) {
        callback = this.instrument(correlationId, 'dummy.create_dummy', callback);
        
        this.call('post', 
            '/dummies',
            correlationId,
            {}, 
            dummy, 
            callback
        );
    }

    public updateDummy(correlationId: string, dummyId: string, dummy: any, callback: any) {
        callback = this.instrument(correlationId, 'dummy.update_dummy', callback);

        let params = {};
        this.addCorrelationId(params, correlationId);
        
        this.call('put', 
            '/dummies/' + dummyId, 
            correlationId,
            {}, 
            dummy, 
            callback
        );
    }

    public deleteDummy(correlationId: string, dummyId: string, callback: any) {
        callback = this.instrument(correlationId, 'dummy.delete_dummy', callback);

        this.call('delete', 
            '/dummies/' + dummyId, 
            correlationId,
            {}, 
            callback
        );
    }
    
}
