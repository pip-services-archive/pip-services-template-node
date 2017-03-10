import { ComponentFactory, NullLogger, ConsoleLogger, NullCounters, LogCounters, NullCache, MemoryCache, MemcachedCache, FileBootConfig, SenecaAddon } from 'pip-services-runtime-node';

import { DefaultFactory, IComponentFactory } from 'pip-services-runtime-node';

import { DummyMongoDbPersistence } from '../persistence/DummyMongoDbPersistence';
import { DummyFilePersistence } from '../persistence/DummyFilePersistence';
import { DummyMemoryPersistence } from '../persistence/DummyMemoryPersistence';
import { DummyController } from '../logic/DummyController';
import { DummyRestClient } from '../clients/version1/DummyRestClient';
import { DummySenecaClient } from '../clients/version1/DummySenecaClient';
import { DummyLambdaClient } from '../clients/version1/DummyLambdaClient';
import { DummyRestService } from '../services/version1/DummyRestService';
import { DummySenecaService } from '../services/version1/DummySenecaService'; 

export class DummyFactory extends ComponentFactory {
	public static Instance: DummyFactory = new DummyFactory();
	
	constructor() {
		super();

		this.register(NullLogger.Descriptor, NullLogger);
		this.register(ConsoleLogger.Descriptor, ConsoleLogger);
		this.register(NullCounters.Descriptor, NullCounters);
		this.register(LogCounters.Descriptor, LogCounters);
		this.register(NullCache.Descriptor, NullCache);
		this.register(MemoryCache.Descriptor, MemoryCache);
		this.register(FileBootConfig.Descriptor, FileBootConfig);
		this.register(SenecaAddon.Descriptor, SenecaAddon);

		this.register(DummyFilePersistence.Descriptor, DummyFilePersistence);
		this.register(DummyMemoryPersistence.Descriptor, DummyMemoryPersistence);
		this.register(DummyMongoDbPersistence.Descriptor, DummyMongoDbPersistence);
		this.register(DummyController.Descriptor, DummyController);
		this.register(DummyRestClient.Descriptor, DummyRestClient);
		this.register(DummySenecaClient.Descriptor, DummySenecaClient);
		this.register(DummyLambdaClient.Descriptor, DummyLambdaClient);
		this.register(DummyRestService.Descriptor, DummyRestService);
		this.register(DummySenecaService.Descriptor, DummySenecaService);
	}
	
}
