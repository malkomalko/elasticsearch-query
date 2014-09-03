/* jshint expr: true */

var subject = require('../../index');

describe('#version', function () {

  it('has a version', function () {
    expect(subject.version).eql('0.1.0');
  });

});