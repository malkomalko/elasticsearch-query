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
  if (query == null && callback == null) {
    return this.search.bind(this, scope);
  }

  var opts = builder.optsWithScope(scope);
  opts.body.query.filtered = builder.buildQuery(query);

  this.client.search(opts).then(function (res) {
    callback(null, res.hits.hits);
  }, function (err) {
    callback(err);
  });
};

/**
 * Exports.
 */

Base.version = require('../lib/version');

module.exports = Base;