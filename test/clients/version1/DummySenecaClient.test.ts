let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';

import { DummyMemoryPersistence } from '../../../src/persistence/DummyMemoryPersistence';
import { DummyController } from '../../../src/logic/DummyController';
import { DummySenecaService } from '../../../src/services/version1/DummySenecaService';
import { DummySenecaClient } from '../../../src/clients/version1/DummySenecaClient';
import { DummyClientFixture } from './DummyClientFixture';

suite('DummySenecaClient', ()=> {        
    let db = new DummyMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new DummyController();
    ctrl.configure(new ComponentConfig());

    let service = new DummySenecaService();
    service.configure(new ComponentConfig());

    let client = new DummySenecaClient();
    client.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    let fixture = new DummyClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});