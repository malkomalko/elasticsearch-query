/**
 * Configure test frameworks.
 */

var chai       = require('chai');
var sinon      = require('sinon');
var sinonChai  = require('sinon-chai');

require('sinon-mocha').enhance(sinon);
chai.use(sinonChai);

/**
 * Globals.
 */

global.assert  = require('assert');
global.expect  = chai.expect;
global.mock    = sinon.mock;
global.noop    = function () {};
global.sinon   = sinon;
global.spy     = sinon.spy;
global.stub    = sinon.stub;