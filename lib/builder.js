/**
 * Functions.
 */

function optsWithScope(scope) {
  scope = scope || '';

  var index  = 0;
  var opts   = { body: {}};
  var parts  = scope.split('/');

  if (scope[0] === '/') index = 1;

  opts.index = parts[index];

  if (parts.length > (index + 1)) {
    opts.type = parts[index + 1];
  }

  return opts;
};

/**
 * Exports.
 */

module.exports = {
  optsWithScope: optsWithScope
};