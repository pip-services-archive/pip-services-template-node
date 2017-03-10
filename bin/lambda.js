/**
 * @file Dummy lambda function
 * @copyright Digital Living Software Corp. 2014-2016
 */

var DummyLambdaFunction = require('../lib/src/run/DummyLambdaFunction').DummyLambdaFunction;

var lambda = new DummyLambdaFunction();
lambda.loadConfigWithDefault('../config/config.json');

exports.handler = lambda.getHandler();