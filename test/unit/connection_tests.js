var subject       = require('../../index');
var elasticsearch = require('elasticsearch');

describe('initializing with connection', function () {

  it('creates a new client', function () {
    spy(elasticsearch, 'Client');

    var opts = { host: 'localhost:9200' };

    var es = new subject(opts);

    expect(elasticsearch.Client).calledWith(opts);
    expect(es.client).ok;
  });

});