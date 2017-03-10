let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IDummyPersistence } from './IDummyPersistence';

export class DummyMongoDbPersistence extends MongoDbPersistence implements IDummyPersistence {
	/**
	 * Unique descriptor for the DummyMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-dummy", "mongodb", "*"
	);

    constructor() {
        super(DummyMongoDbPersistence.Descriptor, require('./DummyModel'));
    }
    
    public getDummies(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void {
        let criteria = _.pick(filter, 'key');

        this.getPage(correlationId, criteria, paging, null, null, callback);
    }

    public getDummyById(correlationId: string, dummyId: string, callback: any): void {
        this.getById(correlationId, dummyId, callback);
    }

    public createDummy(correlationId: string, dummy: any, callback: any): void {
        this.create(correlationId, dummy, callback);
    }

    public updateDummy(correlationId: string, dummyId: string, dummy: any, callback: any): void {
        this.update(correlationId, dummyId, dummy, callback);
    }

    public deleteDummy(correlationId: string, dummyId: string, callback): void {
        this.delete(correlationId, dummyId, callback);
    }
}
