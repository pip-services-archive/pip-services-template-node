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
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var DummyRestService = (function (_super) {
    __extends(DummyRestService, _super);
    function DummyRestService() {
        _super.call(this, DummyRestService.Descriptor);
    }
    DummyRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-dummy", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    DummyRestService.prototype.getDummies = function (req, res) {
        this._logic.getDummies(req.params.correlation_id, new pip_services_runtime_node_4.FilterParams(req.params), new pip_services_runtime_node_5.PagingParams(req.params), this.sendResult(req, res));
    };
    DummyRestService.prototype.getDummyById = function (req, res) {
        this._logic.getDummyById(req.params.correlation_id, req.params.dummyId, this.sendResult(req, res));
    };
    DummyRestService.prototype.createDummy = function (req, res) {
        this._logic.createDummy(req.params.correlation_id, req.body, this.sendCreatedResult(req, res));
    };
    DummyRestService.prototype.updateDummy = function (req, res) {
        this._logic.updateDummy(req.params.correlation_id, req.params.dummyId, req.body, this.sendResult(req, res));
    };
    DummyRestService.prototype.deleteDummy = function (req, res) {
        this._logic.deleteDummy(req.params.correlation_id, req.params.dummyId, this.sendDeletedResult(req, res));
    };
    DummyRestService.prototype.register = function () {
        this.registerRoute('get', '/dummies', this.getDummies);
        this.registerRoute('get', '/dummies/:dummyId', this.getDummyById);
        this.registerRoute('post', '/dummies', this.createDummy);
        this.registerRoute('put', '/dummies/:dummyId', this.updateDummy);
        this.registerRoute('delete', '/dummies/:dummyId', this.deleteDummy);
    };
    /**
     * Unique descriptor for the DummyRestService component
     */
    DummyRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-dummy", "rest", "1.0");
    return DummyRestService;
}(pip_services_runtime_node_3.RestService));
exports.DummyRestService = DummyRestService;
