"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var DummyLambdaClient = (function (_super) {
    __extends(DummyLambdaClient, _super);
    function DummyLambdaClient() {
        _super.call(this, DummyLambdaClient.Descriptor);
    }
    DummyLambdaClient.prototype.getDummies = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'dummy.get_dummies', callback);
        this.call('get_dummies', correlationId, {
            filter: filter ? filter.toObject() : null,
            paging: paging ? paging.toObject() : null
        }, callback);
    };
    DummyLambdaClient.prototype.getDummyById = function (correlationId, dummyId, callback) {
        callback = this.instrument(correlationId, 'dummy.get_dummy_by_id', callback);
        this.call('get_dummy_by_id', correlationId, {
            dummy_id: dummyId
        }, callback);
    };
    DummyLambdaClient.prototype.createDummy = function (correlationId, dummy, callback) {
        callback = this.instrument(correlationId, 'dummy.create_dummy', callback);
        this.call('create_dummy', correlationId, {
            dummy: dummy
        }, callback);
    };
    DummyLambdaClient.prototype.updateDummy = function (correlationId, dummyId, dummy, callback) {
        callback = this.instrument(correlationId, 'dummy.update_dummy', callback);
        this.call('update_dummy', correlationId, {
            dummy_id: dummyId,
            dummy: dummy
        }, callback);
    };
    DummyLambdaClient.prototype.deleteDummy = function (correlationId, dummyId, callback) {
        callback = this.instrument(correlationId, 'dummy.delete_dummy', callback);
        this.call('delete_dummy', correlationId, {
            dummy_id: dummyId
        }, callback);
    };
    /**
     * Unique descriptor for the DummyLambdaClient component
     */
    DummyLambdaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-dummy", "lambda", "1.0");
    return DummyLambdaClient;
}(pip_services_runtime_node_3.LambdaClient));
exports.DummyLambdaClient = DummyLambdaClient;
