"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var DummyFilePersistence_1 = require('./DummyFilePersistence');
var DummyMemoryPersistence = (function (_super) {
    __extends(DummyMemoryPersistence, _super);
    function DummyMemoryPersistence() {
        _super.call(this, DummyMemoryPersistence.Descriptor);
    }
    DummyMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    DummyMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the DummyFilePersistence component
     */
    DummyMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-dummy", "memory", "*");
    return DummyMemoryPersistence;
}(DummyFilePersistence_1.DummyFilePersistence));
exports.DummyMemoryPersistence = DummyMemoryPersistence;
