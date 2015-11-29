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

  });

}();
