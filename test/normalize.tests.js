'use strict';

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      normalize = new require('../lib/normalize')();

  describe('normalize tests', function() {

    // console.log(reline('>' + sample + '<'));

    it('should return zero-length text when supplied with zero-length text', function() {
      expect(normalize('').length).to.equal(0);
    });

    it('should convert "I\'m" to "I am"', function() {
      expect(normalize('I\'m')).to.equal('I am');
    });

    it('should convert "we\'ve" to "we have"', function() {
      expect(normalize('we\'ve')).to.equal('we have');
    });

    // it('should return non-zero-length text when supplied with non-zero-length text', function() {
    //   expect(reline(sample).length).to.be.at.least(1);
    // });

    // it('should return an array of lines when config lineArray is true', function() {
    //     expect(Array.isArray(reline(sample, arrayConfig))).to.equal(true);
    // });

    // it('should return two lines for two paragaphs by default.', function() {
    //   expect(reline(sample).split('\n').length).to.equal(2);
    // });

    // it('should not have spaces at the start of lines.', function() {
    //   var firstCharsNonEmpty = reline(sample, arrayConfig)
    //         .map(function(line) { return (line.charAt(0) != ' '); })
    //   .filter(function(bool) { return bool === false; })
    //   .length === 0;
    //   expect(firstCharsNonEmpty).to.be.true;
    // });

    // it('should strip windows-style \\r chars.', function() {
    //   expect(reline(sampler)).to.not.contain('\r');
    // });

  });

}();
