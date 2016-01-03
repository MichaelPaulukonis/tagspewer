'use strict';

// http://chaijs.com/api/bdd/

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      Tagspewer = require('../lib/tagspewer'),
      spewer = new Tagspewer(),
      lexicon = require('../lib/lexicon.js'),
      // the properties of a lexicon object are reffered to as "tags"
      // they may or may not be valid pos-tags
      // but they are what will be replaced, when surrounded by whitespace, in a template
      // actually, that's something to test...
      // what whitespace is recognized?
      smallLex = {
        "NN":  ["cat"],
        "VBZ": ["sits"],
        "DT":  ["the"],
        "RBR": ["on"]
      };

  describe('tagspewer tests', function() {

    describe('API', function() {

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

    });


    describe('lexicon tests', function() {

      it('should auto-wrap a string-value as a single-element array', function() {
        // if a lexicon property-value is a string
        // it should be auto-encapsulated as an array on 1 element
        var customLexicon = { "NNP": "whales" },
            customSpewer = new Tagspewer(customLexicon);
        expect(customSpewer.spew('NNP')).to.equal('whales');
      });
    });


    describe('spew tests', function() {

      it('should return empty string when called with no parameters', function() {
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

      it('should return known tags in-place', function() {
        var smallSpewer = new Tagspewer(smallLex);
        var templateWithNonTags = 'The NN sits on the futon.';
        var expected = 'The cat sits on the futon.';
        var actual = smallSpewer.spew(templateWithNonTags);
        expect(actual).to.equal(expected);
      });

      it('should return unknown tags in-place', function() {
        var smallSpewer = new Tagspewer(smallLex);
        var templateWithNonTags = 'The QZ sits on the futon.';
        var expected = 'The QZ sits on the futon.';
        var actual = smallSpewer.spew(templateWithNonTags);
        expect(actual).to.equal(expected);
      });

      // WHY is this?
      // WORDS
      it('should ignore known-tags NOT surrounded by whitespace', function() {
        var smallSpewer = new Tagspewer(smallLex);
        var templateNoTags = 'The -NN- sits on the futon.';
        var templateCAPS = 'The UNNI sits on the futon.';

        var actual = smallSpewer.spew(templateNoTags);
        expect(actual).to.equal(templateNoTags);

        actual = smallSpewer.spew(templateCAPS);
        expect(actual).to.equal(templateCAPS);

      });

      // known failure
      it('should recognize tags surrounded by mixed whitespace', function() {
        var smallSpewer = new Tagspewer(smallLex);
        var templateTabs = 'The\tNN\tsits on the futon.';
        var templateMixed = 'The \tNN\t  sits on the futon.';
        var templateSpaces = 'The NN   sits on the futon.';
        var expected = 'The cat sits on the futon.';

        var actual = smallSpewer.spew(templateTabs);
        expect(actual).to.equal(expected);

        actual = smallSpewer.spew(templateMixed);
        expect(actual).to.equal(expected);

        actual = smallSpewer.spew(templateSpaces);
        expect(actual).to.equal(expected);
      });

      // TODO: tests for cleaner param
      it('should use a custom lexicon when provided', function() {
        let spewer = new Tagspewer({ 'NN': ['cat']}),
            lexicon = { 'NN': ['whale'] },
            template = 'NN',
            expected = 'whale',
            // clean = false,
            opts = { template: template, lexicon: lexicon, clean: false },
            actual = spewer.spew(opts);
        expect(actual).to.equal(expected);
      });

      it('should use a custom lexicon when provided, and then use standard lexicon again', function() {
        // ie, custom lexicon in spew() does not overwrite the object's lexicon
        let lexiconStandard = { 'NN': ['cat']},
            spewer = new Tagspewer(lexiconStandard),
            lexiconCustom = { 'NN': ['whale'] },
            template = 'NN',
            expectedCustom = 'whale',
            opts = { template: template, lexicon: lexiconCustom },
            actualCustom = spewer.spew(opts),
            expectedStandard = 'cat',
            actualStandard = spewer.spew(template);
        expect(actualCustom).to.equal(expectedCustom);
        expect(actualStandard).to.equal(expectedStandard);
      });

    });

    // TODO: test that instantiations w/o new still work (as expected)

  });

}();
