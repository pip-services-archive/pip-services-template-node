let _ = require('lodash');

import { ConfigReader } from 'pip-services-runtime-node';
import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { DummyLambdaClient } from '../../../src/clients/version1/DummyLambdaClient';
import { DummyClientFixture } from './DummyClientFixture';

let config = ConfigReader.read('./config/config.yaml'); 
let clientConfigs = config.getSection(Category.Clients) || [];
let lambdaConfig = _.find(clientConfigs, (c) => { 
    return c.getDescriptor().getType() == 'lambda'; 
});

suite('DummyLambdaClient', ()=> {        
    // Skip test if lambda is not configured
    if (lambdaConfig == null) return; 

    let config = ComponentConfig.fromValue(lambdaConfig);
    let client = new DummyLambdaClient();
    client.configure(config);

    let fixture = new DummyClientFixture(client);

    suiteSetup((done) => {
        client.link(new ComponentSet());
        client.open(done);
    });
    
    suiteTeardown((done) => {
        client.close(done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});