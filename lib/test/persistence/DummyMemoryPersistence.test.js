"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var DummyMemoryPersistence_1 = require('../../src/persistence/DummyMemoryPersistence');
var DummyPersistenceFixture_1 = require('./DummyPersistenceFixture');
suite('DummyMemoryPersistence', function () {
    var db, fixture;
    suiteSetup(function (done) {
        db = new DummyMemoryPersistence_1.DummyMemoryPersistence();
        db.configure(new pip_services_runtime_node_2.ComponentConfig());
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
