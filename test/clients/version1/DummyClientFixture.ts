let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IDummyClient } from '../../../src/clients/version1/IDummyClient';

let DUMMY1 = {
    key: 'Key 1',
    content: 'Content 1'
};
let DUMMY2 = {
    key: 'Key 2',
    content: 'Content 2'
};

export class DummyClientFixture {
    private _client: IDummyClient;
    
    constructor(client: IDummyClient) {
        this._client = client;
    }
        
    testCrudOperations(done) {
        var dummy1, dummy2;

        async.series([
        // Create one dummy
            (callback) => {
                this._client.createDummy(
                    null,
                    DUMMY1,
                    (err, dummy) => {
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
                this._client.createDummy(
                    null,
                    DUMMY2,
                    (err, dummy) => {
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
                this._client.getDummies(
                    null,
                    new FilterParams(),
                    new PagingParams(0,5,false),
                    (err, dummies) => {
                        assert.isNull(err);
                        
                        assert.isObject(dummies);
                        assert.isTrue(dummies.data.length >= 2);

                        callback();
                    }
                );
            },
        // Update the dummy
            (callback) => {
                this._client.updateDummy(
                    null,
                    dummy1.id,
                    { content: 'Updated Content 1' },
                    (err, dummy) => {
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
                this._client.deleteDummy(
                    null,
                    dummy1.id,
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
        // Try to get delete dummy
            (callback) => {
                this._client.getDummyById(
                    null,
                    dummy1.id,
                    (err, dummy) => {
                        assert.isNull(err);
                        
                        assert.isNull(dummy || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}
