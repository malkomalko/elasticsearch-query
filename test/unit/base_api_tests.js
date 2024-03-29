/* jshint expr: true */

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

describe('searching', function () {

  beforeEach(function () {
    this.callback = spy();
    this.es       = new subject({ host: 'localhost:9200' });
    this.promise  = {
      then: function (success, error) {}
    };

    stub(this.es.client, 'search').returns(this.promise);
  });

  it('proxys call to elasticsearch driver', function () {
    this.es.search('/foo', {});

    expect(this.es.client.search).called;
  });

  it('takes in a scope for the query as first param', function () {
    this.es.search('/tests/test', {});

    expect(this.es.client.search).calledWithMatch({
      index: 'tests',
      type: 'test'
    });
  });

  it('autocurrys if passed only scope', function () {
    var curry = this.es.search('/tests/test');

    expect(this.es.client.search).not.called;

    curry({});

    expect(this.es.client.search).calledWithMatch({
      index: 'tests',
      type: 'test'
    });
  });

  it('returns the hits', function () {
    var res = {
      foo: 'bar',
      hits: {
        baz: 'boo',
        hits: [
          { name: 'jane' },
          { name: 'jim' }
        ]
      }
    };

    stub(this.promise, 'then').yields(res);

    this.es.search('/tests/test', {}, this.callback);

    expect(this.callback).calledWith(null, res.hits.hits);
  });

  it('handles errors while searching', function () {
    var err = new Error('failure');

    stub(this.promise, 'then').callsArgWith(1, err);

    this.es.search('/tests/test', {}, this.callback);

    expect(this.callback).calledWith(err);
  });

});