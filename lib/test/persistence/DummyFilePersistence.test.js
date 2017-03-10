"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var DummyFilePersistence_1 = require('../../src/persistence/DummyFilePersistence');
var DummyPersistenceFixture_1 = require('./DummyPersistenceFixture');
var config = pip_services_runtime_node_2.ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/dummies.json',
        data: []
    }
});
suite('DummyFilePersistence', function () {
    var db, fixture;
    suiteSetup(function (done) {
        db = new DummyFilePersistence_1.DummyFilePersistence();
        db.configure(config);
        fixture = new DummyPersistenceFixture_1.DummyPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
