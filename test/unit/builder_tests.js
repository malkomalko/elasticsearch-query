/* jshint expr: true */

var subject = require('builder');

describe('#buildQuery', function () {

  it('turns $f key into filter', function () {
    var actual = subject.buildQuery({ $f: { name: 'foo' }});

    expect(actual).eql({ filter: { name: 'foo' }});
  });

  it('turns $q key into query', function () {
    var actual = subject.buildQuery({ $q: { name: 'foo' }});

    expect(actual).eql({ query: { name: 'foo' }});
  });

});

describe('#optsWithScope', function () {

  it('sets index with forward slash', function () {
    expect(subject.optsWithScope('/foo').index).eql('foo');
  });

  it('sets index without forward slash', function () {
    expect(subject.optsWithScope('foo').index).eql('foo');
  });

  it('sets type with forward slash', function () {
    var opts = subject.optsWithScope('/foo/bar,baz');

    expect(opts.index).eql('foo');
    expect(opts.type).eql('bar,baz');
  });

  it('sets type without forward slash', function () {
    var opts = subject.optsWithScope('foo/bar*,baz*');

    expect(opts.index).eql('foo');
    expect(opts.type).eql('bar*,baz*');
  });

  it('treats empty strings as _all index', function () {
    expect(subject.optsWithScope('').index).eql('_all');
    expect(subject.optsWithScope('   ').index).eql('_all');
    expect(subject.optsWithScope(null).index).eql('_all');
    expect(subject.optsWithScope(undefined).index).eql('_all');
  });

});