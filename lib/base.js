/**
 * External dependencies.
 */

var elasticsearch = require('elasticsearch');

/**
 * Internal dependencies.
 */

var builder = require('../lib/builder');

/**
 * Functions.
 */

function Base(args) {
  this.client = new elasticsearch.Client(args);
};

Base.prototype.search = function search (scope, query, callback) {
  var opts = builder.optsWithScope(scope);

  this.client.search(opts).then(function (res) {
    callback(null, res);
  }, function (err) {
    callback(err);
  });
};

/**
 * Exports.
 */

Base.version = require('../lib/version');

module.exports = Base;