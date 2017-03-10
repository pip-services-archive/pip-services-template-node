"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var DummyMemoryPersistence_1 = require('../../../src/persistence/DummyMemoryPersistence');
var DummyController_1 = require('../../../src/logic/DummyController');
var DummyRestService_1 = require('../../../src/services/version1/DummyRestService');
var DummyRestClient_1 = require('../../../src/clients/version1/DummyRestClient');
var DummyClientFixture_1 = require('./DummyClientFixture');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.protocol', 'http', 'endpoint.host', 'localhost', 'endpoint.port', 3000);
suite('DummyRestClient', function () {
    var seneca;
    var db = new DummyMemoryPersistence_1.DummyMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new DummyController_1.DummyController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new DummyRestService_1.DummyRestService();
    service.configure(restConfig);
    var client = new DummyRestClient_1.DummyRestClient();
    client.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, service);
    var fixture = new DummyClientFixture_1.DummyClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
