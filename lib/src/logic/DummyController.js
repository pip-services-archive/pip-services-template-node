"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var DummyCommandSet_1 = require('./DummyCommandSet');
var DummyController = (function (_super) {
    __extends(DummyController, _super);
    function DummyController() {
        _super.call(this, DummyController.Descriptor);
    }
    DummyController.prototype.link = function (components) {
        // Locate reference to dummy persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-dummy", '*', '*'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new DummyCommandSet_1.DummyCommandSet(this);
        this.addCommandSet(commands);
    };
    DummyController.prototype.getDummies = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'dummy.get_dummies', callback);
        this._db.getDummies(correlationId, filter, paging, callback);
    };
    DummyController.prototype.getDummyById = function (correlationId, dummyId, callback) {
        callback = this.instrument(correlationId, 'dummy.get_dummy_by_id', callback);
        this._db.getDummyById(correlationId, dummyId, callback);
    };
    DummyController.prototype.createDummy = function (correlationId, dummy, callback) {
        callback = this.instrument(correlationId, 'dummy.create_dummy', callback);
        this._db.createDummy(correlationId, dummy, callback);
    };
    DummyController.prototype.updateDummy = function (correlationId, dummyId, dummy, callback) {
        callback = this.instrument(correlationId, 'dummy.update_dummy', callback);
        this._db.updateDummy(correlationId, dummyId, dummy, callback);
    };
    DummyController.prototype.deleteDummy = function (correlationId, dummyId, callback) {
        callback = this.instrument(correlationId, 'dummy.delete_dummy', callback);
        this._db.deleteDummy(correlationId, dummyId, callback);
    };
    /**
     * Unique descriptor for the DummyController component
     */
    DummyController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-dummy", "*", "*");
    return DummyController;
}(pip_services_runtime_node_3.AbstractController));
exports.DummyController = DummyController;
