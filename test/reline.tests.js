'use strict';

// exeecute with `mocha test.js`

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      reline = require('../lib/reline'),
      sample = 'this is an example\nof multi-line text\nthat space lines.\n\nAnd has more than\none paragraph.',
      sampler = 'this is an example\r\nof windows-line breaks.',
      endhyphens =      'he was no console man, no cyberspace cow-\nboy.  temperfoam bunched between his fin-\ngers, trying to reach the console that wasn\'t there.',
      endhyphensclear = 'he was no console man, no cyberspace cowboy.  temperfoam bunched between his fingers, trying to reach the console that wasn\'t there.',
      arrayConfig = {
        lineArray: true
      };


  describe('reline tests', function() {

    it('should return zero-length text when supplied with zero-length text', function() {
      expect(reline('').length).to.equal(0);
    });

    it('should return non-zero-length text when supplied with non-zero-length text', function() {
      expect(reline(sample).length).to.be.at.least(1);
    });

    it('should return an array of lines when config lineArray is true', function() {
        expect(Array.isArray(reline(sample, arrayConfig))).to.equal(true);
    });

    it('should return two lines for two paragaphs by default.', function() {
      expect(reline(sample).split('\n').length).to.equal(2);
    });

    it('should not have spaces at the start of lines.', function() {
      var firstCharsNonEmpty = reline(sample, arrayConfig)
            .map(function(line) { return (line.charAt(0) != ' '); })
      .filter(function(bool) { return bool === false; })
      .length === 0;
      expect(firstCharsNonEmpty).to.be.true;
    });

    it('should not have spaces at the end of the paragraph(s).', function() {
      var lastCharsNonEmpty = reline(sample, arrayConfig)
            .map(function(line) { return (line.charAt(line.length-1) != ' '); })
      .filter(function(bool) { return bool === false; })
      .length === 0;
      expect(lastCharsNonEmpty).to.be.true;
    });

    it('should strip windows-style \\r chars.', function() {
      expect(reline(sampler)).to.not.contain('\r');
    });

    it('should merge words hyphenated over line-breaks (when relining)', function() {
      expect(reline(endhyphens)).to.equal(endhyphensclear);
    });

  });

}();
