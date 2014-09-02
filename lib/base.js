/**
 * External dependencies.
 */

var elasticsearch = require('elasticsearch');

/**
 * Functions.
 */

function Base(args) {
  this.client = new elasticsearch.Client(args);
};

/**
 * Exports.
 */

Base.version = require('../lib/version');

module.exports = Base;