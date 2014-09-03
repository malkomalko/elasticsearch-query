/**
 * Functions.
 */

function buildMatches(opts) {
  opts = opts || {};

  var matches = {};

  if (Object.keys(opts).length > 0) {
    matches.bool = {
      must: []
    };

    for (var key in opts) {
      var match = {};
      match[key] = opts[key];
      matches.bool.must.push({ match: match });
    }
  }

  return matches;
}

function buildQuery(query) {
  var opts = {};

  if (query.$f) opts.filter = query.$f;
  if (query.$q) {
    opts.query = buildMatches(query.$q);
  }

  return opts;
}

function optsWithScope(scope) {
  scope = scope || '';

  var index  = 0;
  var opts   = { body: { query: { filtered: {}}}};
  var parts  = scope.split('/');

  if (scope[0] === '/') index = 1;

  opts.index = parts[index].trim().length > 0 ? parts[index] : '_all';

  if (parts.length > (index + 1)) {
    opts.type = parts[index + 1];
  }

  return opts;
}

/**
 * Exports.
 */

module.exports = {
  buildQuery: buildQuery,
  optsWithScope: optsWithScope
};