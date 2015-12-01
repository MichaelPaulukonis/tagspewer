'use strict';



// var lexicon = require('../lib/lexicon.js');
// var Spew = require('../lib/tagspewer.js');
// var spewer = new Spew(lexicon);

// // TODO: testis where lexicon IS THE DEFAULT - becuase it doesn't work

// exports['spewer'] = {
//   setUp: function(done) {
//     // setup here
//     done();
//   },
//   'basics': function(test) {
//     test.expect(4);
//     // tests here
//     test.equal(typeof spewer, 'object', 'expected an object');
//     test.equal(typeof spewer.spew, 'function', 'expected `spew` to be a function');
//     test.equal(spewer.spew('JJ NN').split(' ').length, 2, 'expected 2 words back from "JJ NN"');
//     test.equal(spewer.spew('junk'), '', 'expected an empty string when passed junk tags');
//     test.done();
//   },
// };

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      Tagspewer = require('../lib/tagspewer'),
      spewer = new Tagspewer(),
      lexicon = require('../lib/lexicon.js');

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

    // TODO: test output based on custom-lexicon

    // TODO: test that instantiations w/o new still work (as expected)

  });

}();
