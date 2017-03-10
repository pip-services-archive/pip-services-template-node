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
var DummyMongoDbPersistence = (function (_super) {
    __extends(DummyMongoDbPersistence, _super);
    function DummyMongoDbPersistence() {
        _super.call(this, DummyMongoDbPersistence.Descriptor, require('./DummyModel'));
    }
    DummyMongoDbPersistence.prototype.getDummies = function (correlationId, filter, paging, callback) {
        var criteria = _.pick(filter, 'key');
        this.getPage(correlationId, criteria, paging, null, null, callback);
    };
    DummyMongoDbPersistence.prototype.getDummyById = function (correlationId, dummyId, callback) {
        this.getById(correlationId, dummyId, callback);
    };
    DummyMongoDbPersistence.prototype.createDummy = function (correlationId, dummy, callback) {
        this.create(correlationId, dummy, callback);
    };
    DummyMongoDbPersistence.prototype.updateDummy = function (correlationId, dummyId, dummy, callback) {
        this.update(correlationId, dummyId, dummy, callback);
    };
    DummyMongoDbPersistence.prototype.deleteDummy = function (correlationId, dummyId, callback) {
        this.delete(correlationId, dummyId, callback);
    };
    /**
     * Unique descriptor for the DummyMongoDbPersistence component
     */
    DummyMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-dummy", "mongodb", "*");
    return DummyMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.DummyMongoDbPersistence = DummyMongoDbPersistence;
