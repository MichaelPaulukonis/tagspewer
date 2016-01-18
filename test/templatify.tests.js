'use strict';

// exeecute with `mocha test.js`

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      Templatify = require('../index.js').templatify,
      teamplatify = new Templatify(),
      sample = 'I am with you in Rockland',
      samplePOS = 'NN VBP IN PRP IN NN',
      sampleTemplate = 'NN VBP IN PRP IN NN:::I am with you in Rockland';


  describe('templatify tests', function() {

    describe('API tests', function() {

      // expect(teamplatify).to.be.an.instanceof(templatify);

      it('should expose a processText method', function() {
        expect(teamplatify.processText).to.be.a('function');
      });

    });

    describe('processText tests', function() {

      it('should return an non-zero-length array of string when provided with text', function() {
        var templ = teamplatify.processText(sample);
        expect(templ).to.be.an('array');
        expect(templ).to.have.length.above(0);
        expect(typeof templ[0]).to.be.a('string');
      });

    });

  });

}();
