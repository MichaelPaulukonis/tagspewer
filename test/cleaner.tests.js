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

    it('should clean up spaces with single quotation marks.', function() {
      expect(cleaner('I am \' a good man \' he said.')).to.equal('I am \'a good man\' he said.');
    });

    it('should clean up spaces with double quotation marks.', function() {
      expect(cleaner('I am " a good man " he said.')).to.equal('I am "a good man" he said.');
    });

    it('should remove space before quotation marks at end of line.', function() {
      // NOT GONNA HAPPEN
      // since the sentence-tokenizer does this: [ 'This acument.', '"' ]
      expect(cleaner('This acumen.  "')).to.equal('This acumen."');
      expect(cleaner('This acumen.  \'')).to.equal('This acumen.\'');
    });

    it('should capitalize the first letter of a sentence.', function() {
      expect(cleaner('like this.')).to.equal('Like this.');
    });

    it('should capitalize the first letter of each sentence in a paragraph.', function() {
      expect(cleaner('like this. and this.')).to.equal('Like this. And this.');
    });

  });

}();
