/**
 * @file Dummy seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var DummySenecaPlugin = require('../lib/src/run/DummySenecaPlugin').DummySenecaPlugin;
var plugin = new DummySenecaPlugin();

module.exports = plugin.entry();