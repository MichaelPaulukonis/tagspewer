'use strict';

// exeecute with `mocha test.js`

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      Templatize = require('../lib/templatize'),
      templatize = new Templatize(),
      sample = 'I am with you in Rockland',
      samplePOS = 'NN VBP IN PRP IN NN',
      sampleTemplate = 'NN VBP IN PRP IN NN:::I am with you in Rockland';


  describe('Templatize tests', function() {

    describe('API tests', function() {

      // expect(templatize).to.be.an.instanceof(Templatize);

      it('should expose a processText method', function() {
        expect(templatize.processText).to.be.a('function');
      });

      it('should expose a processFile method', function() {
        expect(templatize.processFile).to.be.a('function');
      });

    });

    describe('processText tests', function() {

      it('should return an non-zero-length array of string when provided with text', function() {
        var templ = templatize.processText(sample);
        expect(templ).to.be.an('array');
        expect(templ).to.have.length.above(0);
        expect(typeof templ[0]).to.be.a('string');
      });

    });

  });

}();
