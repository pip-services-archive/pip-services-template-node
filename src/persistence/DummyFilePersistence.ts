let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IDummyPersistence } from './IDummyPersistence';

export class DummyFilePersistence extends FilePersistence implements IDummyPersistence {
	/**
	 * Unique descriptor for the DummyFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-dummy", "file", "*"
	);
    
    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || DummyFilePersistence.Descriptor);
    }
    
    public getDummies(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let filterParams = <any>filter;
        let key = filterParams.key;

        let filterFunc = (item) => {
            if (key && item.key != key) 
                return false;
            return true; 
        }

        this.getPage(correlationId, filterFunc, paging, null, null, callback);
    }

    public getDummyById(correlationId: string, dummyId: string, callback: any) {
        let id = dummyId;

        this.getById(correlationId, id, callback);
    }

    public createDummy(correlationId: string, dummy: any, callback: any) {
        let item = dummy;
        item = _.pick(item, 'id', 'key', 'content');
            
        this.create(correlationId, item, callback);
    }

    public updateDummy(correlationId: string, dummyId: string, dummy: any, callback: any) {
        let id = dummyId;
        let newItem = dummy;
        newItem = _.pick(newItem, 'key', 'content');

        this.update(correlationId, id, newItem, callback);
    }

    public deleteDummy(correlationId: string, dummyId: string, callback: any) {
        let id = dummyId;
        
        this.delete(correlationId, id, callback);
    }
}
