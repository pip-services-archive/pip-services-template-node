"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var DummyMongoDbPersistence_1 = require('../../src/persistence/DummyMongoDbPersistence');
var DummyPersistenceFixture_1 = require('./DummyPersistenceFixture');
var config = pip_services_runtime_node_2.ConfigReader.read('./config/config.yaml');
var dbConfigs = config.getSection(pip_services_runtime_node_1.Category.Persistence) || [];
var dbConfig = dbConfigs.length == 1 ? dbConfigs[0] : null;
suite('DummyMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbConfig.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new DummyMongoDbPersistence_1.DummyMongoDbPersistence();
    db.configure(dbConfig);
    var fixture = new DummyPersistenceFixture_1.DummyPersistenceFixture(db);
    suiteSetup(function (done) {
        db.link(new pip_services_runtime_node_3.ComponentSet());
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
