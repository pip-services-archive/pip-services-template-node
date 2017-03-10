"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var DummyMemoryPersistence_1 = require('../../../src/persistence/DummyMemoryPersistence');
var DummyController_1 = require('../../../src/logic/DummyController');
var DummySenecaService_1 = require('../../../src/services/version1/DummySenecaService');
var DUMMY1 = {
    key: 'Key 1',
    content: 'Content 1'
};
var DUMMY2 = {
    key: 'Key 2',
    content: 'Content 2'
};
suite('DummySenecaService', function () {
    var db = new DummyMemoryPersistence_1.DummyMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new DummyController_1.DummyController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new DummySenecaService_1.DummySenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        var dummy1, dummy2;
        async.series([
            // Create one dummy
            function (callback) {
                seneca.getSeneca().act({
                    role: 'dummy',
                    cmd: 'create_dummy',
                    dummy: DUMMY1
                }, function (err, dummy) {
                    assert.isNull(err);
                    assert.isObject(dummy);
                    assert.equal(dummy.content, DUMMY1.content);
                    assert.equal(dummy.key, DUMMY1.key);
                    dummy1 = dummy;
                    callback();
                });
            },
            // Create another dummy
            function (callback) {
                seneca.getSeneca().act({
                    role: 'dummy',
                    cmd: 'create_dummy',
                    dummy: DUMMY2
                }, function (err, dummy) {
                    assert.isNull(err);
                    assert.isObject(dummy);
                    assert.equal(dummy.content, DUMMY2.content);
                    assert.equal(dummy.key, DUMMY2.key);
                    dummy2 = dummy;
                    callback();
                });
            },
            // Get all dummies
            function (callback) {
                seneca.getSeneca().act({
                    role: 'dummy',
                    cmd: 'get_dummies'
                }, function (err, dummies) {
                    assert.isNull(err);
                    assert.isObject(dummies);
                    assert.lengthOf(dummies.data, 2);
                    callback();
                });
            },
            // Update the dummy
            function (callback) {
                seneca.getSeneca().act({
                    role: 'dummy',
                    cmd: 'update_dummy',
                    dummy_id: dummy1.id,
                    dummy: { content: 'Updated Content 1' }
                }, function (err, dummy) {
                    assert.isNull(err);
                    assert.isObject(dummy);
                    assert.equal(dummy.content, 'Updated Content 1');
                    assert.equal(dummy.key, DUMMY1.key);
                    dummy1 = dummy;
                    callback();
                });
            },
            // Delete dummy
            function (callback) {
                seneca.getSeneca().act({
                    role: 'dummy',
                    cmd: 'delete_dummy',
                    dummy_id: dummy1.id
                }, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete dummy
            function (callback) {
                seneca.getSeneca().act({
                    role: 'dummy',
                    cmd: 'get_dummy_by_id',
                    dummy_id: dummy1.id
                }, function (err, dummy) {
                    assert.isNull(err);
                    assert.isNull(dummy || null);
                    callback();
                });
            }
        ], done);
    });
});
