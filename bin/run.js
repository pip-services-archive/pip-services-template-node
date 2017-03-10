/**
 * @file Dummy process runner
 * @copyright Digital Living Software Corp. 2014-2016
 */

var DummyProcessRunner = require('../lib/src/run/DummyProcessRunner').DummyProcessRunner;

var runner = new DummyProcessRunner();
runner.startWithDefaultConfig('./config/config.json');