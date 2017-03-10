let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { DummyMemoryPersistence } from '../../../src/persistence/DummyMemoryPersistence';
import { DummyController } from '../../../src/logic/DummyController';
import { DummyRestService } from '../../../src/services/version1/DummyRestService';

var restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

let DUMMY1 = {
    key: 'Key 1',
    content: 'Content 1'
};
let DUMMY2 = {
    key: 'Key 2',
    content: 'Content 2'
};

suite('DummyRestService', ()=> {    
    let db = new DummyMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new DummyController();
    ctrl.configure(new ComponentConfig());

    let service = new DummyRestService();
    service.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

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
        let dummy1, dummy2;

        async.series([
        // Create one dummy
            (callback) => {
                rest.post('/dummies',
                    DUMMY1,
                    (err, req, res, dummy) => {
                        assert.isNull(err);
                        
                        assert.isObject(dummy);
                        assert.equal(dummy.content, DUMMY1.content);
                        assert.equal(dummy.key, DUMMY1.key);

                        dummy1 = dummy;

                        callback();
                    }
                );
            },
        // Create another dummy
            (callback) => {
                rest.post('/dummies', 
                    DUMMY2,
                    (err, req, res, dummy) => {
                        assert.isNull(err);
                        
                        assert.isObject(dummy);
                        assert.equal(dummy.content, DUMMY2.content);
                        assert.equal(dummy.key, DUMMY2.key);

                        dummy2 = dummy;

                        callback();
                    }
                );
            },
        // Get all dummies
            (callback) => {
                rest.get('/dummies',
                    (err, req, res, dummies) => {
                        assert.isNull(err);
                        
                        assert.isObject(dummies);
                        assert.lengthOf(dummies.data, 2);

                        callback();
                    }
                );
            },
        // Update the dummy
            (callback) => {
                rest.put('/dummies/' + dummy1.id,
                    { content: 'Updated Content 1' },
                    (err, req, res, dummy) => {
                        assert.isNull(err);
                        
                        assert.isObject(dummy);
                        assert.equal(dummy.content, 'Updated Content 1');
                        assert.equal(dummy.key, DUMMY1.key);

                        dummy1 = dummy;

                        callback();
                    }
                );
            },
        // Delete dummy
            (callback) => {
                rest.del('/dummies/' + dummy1.id,
                    (err, req, res) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
        // Try to get delete dummy
            (callback) => {
                rest.get('/dummies/' + dummy1.id,
                    (err, req, res, dummy) => {
                        // assert.isNull(err);
                        
                        // assert.isNull(dummy || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});