"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var DummyMemoryPersistence_1 = require('../../../src/persistence/DummyMemoryPersistence');
var DummyController_1 = require('../../../src/logic/DummyController');
var DummySenecaService_1 = require('../../../src/services/version1/DummySenecaService');
var DummySenecaClient_1 = require('../../../src/clients/version1/DummySenecaClient');
var DummyClientFixture_1 = require('./DummyClientFixture');
suite('DummySenecaClient', function () {
    var db = new DummyMemoryPersistence_1.DummyMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new DummyController_1.DummyController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new DummySenecaService_1.DummySenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var client = new DummySenecaClient_1.DummySenecaClient();
    client.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_4.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    var fixture = new DummyClientFixture_1.DummyClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_3.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
