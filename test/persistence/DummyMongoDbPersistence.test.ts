import { Category } from 'pip-services-runtime-node';
import { ConfigReader } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { DummyMongoDbPersistence } from '../../src/persistence/DummyMongoDbPersistence';
import { DummyPersistenceFixture } from './DummyPersistenceFixture';

let config = ConfigReader.read('./config/config.yaml');
let dbConfigs = config.getSection(Category.Persistence) || [];
let dbConfig = dbConfigs.length == 1 ? dbConfigs[0] : null;

suite('DummyMongoDbPersistence', ()=> {
    // Skip test if mongodb is not configured
    if (dbConfig.getRawContent().getString('descriptor.type') != 'mongodb')
        return; 
    
    let db = new DummyMongoDbPersistence();
    db.configure(dbConfig);

    let fixture = new DummyPersistenceFixture(db);

    suiteSetup((done) => {
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