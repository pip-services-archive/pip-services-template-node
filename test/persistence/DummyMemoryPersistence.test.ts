import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { DummyMemoryPersistence } from '../../src/persistence/DummyMemoryPersistence';
import { DummyPersistenceFixture } from './DummyPersistenceFixture';

suite('DummyMemoryPersistence', ()=> {
    let db, fixture;
    
    suiteSetup((done) => {
        db = new DummyMemoryPersistence();
        db.configure(new ComponentConfig());

        fixture = new DummyPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done);
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });

    setup((done) => {
        db.clearTestData(done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});