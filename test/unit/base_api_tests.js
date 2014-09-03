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
    this.es = new subject({ host: 'localhost:9200' });
    this.promise = {
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

});