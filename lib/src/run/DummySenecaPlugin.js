"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var DummyMicroservice_1 = require('./DummyMicroservice');
var DummySenecaPlugin = (function (_super) {
    __extends(DummySenecaPlugin, _super);
    function DummySenecaPlugin() {
        _super.call(this, 'dummy', new DummyMicroservice_1.DummyMicroservice());
    }
    return DummySenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.DummySenecaPlugin = DummySenecaPlugin;
