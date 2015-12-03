'use strict';

// http://chaijs.com/api/bdd/

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      Tagspewer = require('../lib/tagspewer'),
      spewer = new Tagspewer(),
      lexicon = require('../lib/lexicon.js'),
      smallLex = {
        "NN":  ["cat"],
        "VBZ": ["sits"],
        "DT":  ["the"],
        "RBR": ["on"]
      };

  describe('tagspewer tests', function() {

    it('Tagspewer should be a function', function() {
      expect(Tagspewer).to.be.an('function');
    });

    it('should return an object', function() {
      expect(spewer).to.be.an('object');
    });

    it('should have a spew method', function() {
      expect(spewer.spew).to.be.an('function');
    });

    it('should expose a (default) lexicon', function() {
      expect(spewer.lexicon).to.be.an('object');
    });

    it('should take in a non-default lexicon, and expose it', function() {
      var customLexicon = { "NNP": ["whales"] };
      var customSpewer = new Tagspewer(customLexicon);
      expect(customSpewer.lexicon).to.equal(customLexicon);
    });

    describe('spew tests', function() {

      it('should return empty string with no parameters', function() {
        var actual = spewer.spew();
        var expected = '';
        expect(actual).to.be.an('string');
        expect(actual).to.equal(expected);
      });

      it('should return requested tags', function() {
        var smallSpewer = new Tagspewer(smallLex);
        var singleTagOutput = smallSpewer.spew('VBZ');
        var doubleTagOutput = smallSpewer.spew('VBZ RBR');
        expect(singleTagOutput).to.equal('sits');
        expect(doubleTagOutput).to.equal('sits on');
      });

      it('should return unkown tags in-place', function() {
        var smallSpewer = new Tagspewer(smallLex);
        var templateWithNonTags = 'The NN sits on the futon.';
        var expected = 'The cat sits on the futon.';
        var actual = smallSpewer.spew(templateWithNonTags);
        expect(actual).to.equal(expected);
      });

    });

    // TODO: test that instantiations w/o new still work (as expected)

  });

}();
