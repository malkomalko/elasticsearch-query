var subject = require('builder');

describe('#optsWithScope', function () {

  it('sets index with forward slash', function () {
    expect(subject.optsWithScope('/foo').index).eql('foo');
  });

  it('sets index without forward slash', function () {
    expect(subject.optsWithScope('foo').index).eql('foo');
  });

  it('sets type with forward slash', function () {
    var opts = subject.optsWithScope('/foo/bar,baz')

    expect(opts.index).eql('foo');
    expect(opts.type).eql('bar,baz');
  });

  it('sets type without forward slash', function () {
    var opts = subject.optsWithScope('foo/bar*,baz*')

    expect(opts.index).eql('foo');
    expect(opts.type).eql('bar*,baz*');
  });

});