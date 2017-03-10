"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var DummyLambdaClient_1 = require('../../../src/clients/version1/DummyLambdaClient');
var DummyClientFixture_1 = require('./DummyClientFixture');
var config = pip_services_runtime_node_1.ConfigReader.read('./config/config.yaml');
var clientConfigs = config.getSection(pip_services_runtime_node_2.Category.Clients) || [];
var lambdaConfig = _.find(clientConfigs, function (c) {
    return c.getDescriptor().getType() == 'lambda';
});
suite('DummyLambdaClient', function () {
    // Skip test if lambda is not configured
    if (lambdaConfig == null)
        return;
    var config = pip_services_runtime_node_4.ComponentConfig.fromValue(lambdaConfig);
    var client = new DummyLambdaClient_1.DummyLambdaClient();
    client.configure(config);
    var fixture = new DummyClientFixture_1.DummyClientFixture(client);
    suiteSetup(function (done) {
        client.link(new pip_services_runtime_node_3.ComponentSet());
        client.open(done);
    });
    suiteTeardown(function (done) {
        client.close(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
});
