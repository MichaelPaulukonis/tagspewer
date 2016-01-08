'use strict';

// exeecute with `mocha test.js`

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      Tagbagify = require('../lib/tagbagify'),
      tagbagify = new Tagbagify(),
      sample = 'I am with you in Rockland';


  describe('tagbagify tests', function() {

    describe('API tests', function() {


      it('should return a new instance with new', function() {
        var nt = new Tagbagify();
        expect(nt).to.be.a('object');
        expect(nt).to.be.an.instanceof(Tagbagify);
      });

      it('should return a new instance even without new', function() {
        var t = Tagbagify();
        expect(t).to.be.a('object');
        expect(t).to.be.an.instanceof(Tagbagify);
      });

      it('should expose a processText method', function() {
        expect(tagbagify.processText).to.be.a('function');
      });

    });

    describe('processText tests', function() {

      // this is a bit unweildly
      // and maybe should be broken out...
      it('should return an object with a non-zero number of properties when provided with non-zero-length text', function() {
        var templ = tagbagify.processText(sample);
        expect(templ).to.be.an('object');
      });

      it('should have properties whose values is array of string when provided with non-zero-length text', function() {
        var templ = tagbagify.processText(sample);
        var keys = Object.keys(templ);
        var aProperty = templ[keys[0]];
        expect(aProperty).to.be.an('array');
        expect(aProperty).to.have.length.above(0);
        expect(aProperty[0]).to.be.a('string');
        // TODO: no property will have 0-length
      });

    });

  });

}();
