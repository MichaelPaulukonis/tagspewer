'use strict';

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      cleaner = require('../lib/cleaner');

  describe('cleaner tests', function() {

    it('should return zero-length text when supplied with zero-length text', function() {
      expect(cleaner('').length).to.equal(0);
    });

    it('should remove spaces before these punctuation marks [.,;!]', function() {
      expect(cleaner('I am this .')).to.equal('I am this.');
      expect(cleaner('I am , this.')).to.equal('I am, this.');
      expect(cleaner('I am : this .')).to.equal('I am: this.');
      expect(cleaner('I am ; this .')).to.equal('I am; this.');
      expect(cleaner('I am this !')).to.equal('I am this!');
      expect(cleaner('I am this ?')).to.equal('I am this?');
      expect(cleaner('I am this.')).to.equal('I am this.');
    });

    it('should clean up spaces and quotation marks.', function() {
      expect(cleaner('I am \' he \' .')).to.equal('I am \'he\'.');
    });

    it('should remove space before quotation marks at end of line.', function() {
      expect(cleaner('This acumen.  "')).to.equal('This acumen."');
      expect(cleaner('This acumen.  \'')).to.equal('This acumen.\'');
    });

    it('should capitalize the first letter of a sentence.', function() {
      expect(cleaner('like this.')).to.equal('Like this.');
    });

  });

}();
