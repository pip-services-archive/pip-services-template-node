let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { DummyFilePersistence } from './DummyFilePersistence';
import { IDummyPersistence } from './IDummyPersistence';

export class DummyMemoryPersistence extends DummyFilePersistence implements IDummyPersistence {
	/**
	 * Unique descriptor for the DummyFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-dummy", "memory", "*"
	);

    constructor() {
        super(DummyMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }

}