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
var DummyFilePersistence = (function (_super) {
    __extends(DummyFilePersistence, _super);
    function DummyFilePersistence(descriptor) {
        _super.call(this, descriptor || DummyFilePersistence.Descriptor);
    }
    DummyFilePersistence.prototype.getDummies = function (correlationId, filter, paging, callback) {
        var filterParams = filter;
        var key = filterParams.key;
        var filterFunc = function (item) {
            if (key && item.key != key)
                return false;
            return true;
        };
        this.getPage(correlationId, filterFunc, paging, null, null, callback);
    };
    DummyFilePersistence.prototype.getDummyById = function (correlationId, dummyId, callback) {
        var id = dummyId;
        this.getById(correlationId, id, callback);
    };
    DummyFilePersistence.prototype.createDummy = function (correlationId, dummy, callback) {
        var item = dummy;
        item = _.pick(item, 'id', 'key', 'content');
        this.create(correlationId, item, callback);
    };
    DummyFilePersistence.prototype.updateDummy = function (correlationId, dummyId, dummy, callback) {
        var id = dummyId;
        var newItem = dummy;
        newItem = _.pick(newItem, 'key', 'content');
        this.update(correlationId, id, newItem, callback);
    };
    DummyFilePersistence.prototype.deleteDummy = function (correlationId, dummyId, callback) {
        var id = dummyId;
        this.delete(correlationId, id, callback);
    };
    /**
     * Unique descriptor for the DummyFilePersistence component
     */
    DummyFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-dummy", "file", "*");
    return DummyFilePersistence;
}(pip_services_runtime_node_3.FilePersistence));
exports.DummyFilePersistence = DummyFilePersistence;
