let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { DummyMemoryPersistence } from '../../../src/persistence/DummyMemoryPersistence';
import { DummyController } from '../../../src/logic/DummyController';
import { DummyRestService } from '../../../src/services/version1/DummyRestService';
import { DummyRestClient } from '../../../src/clients/version1/DummyRestClient';
import { DummyClientFixture } from './DummyClientFixture';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.protocol', 'http',
    'endpoint.host', 'localhost',
    'endpoint.port', 3000
);

suite('DummyRestClient', ()=> {    
    let seneca;
    let db = new DummyMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new DummyController();
    ctrl.configure(new ComponentConfig());

    let service = new DummyRestService();
    service.configure(restConfig);

    let client = new DummyRestClient();
    client.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, client, service);
    let fixture = new DummyClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});