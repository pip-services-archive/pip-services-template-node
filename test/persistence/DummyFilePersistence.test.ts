import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { DummyFilePersistence } from '../../src/persistence/DummyFilePersistence';
import { DummyPersistenceFixture } from './DummyPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/dummies.json',
        data: []
    }
});

suite('DummyFilePersistence', ()=> {
    let db, fixture;
    
    suiteSetup((done) => {
        db = new DummyFilePersistence();
        db.configure(config);

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