'use strict';

// exeecute with `mocha test.js`

var tester = function() {

  var mocha = require('mocha'),
      chai = require('chai'),
      expect = chai.expect,
      reline = require('../lib/reline'),
      sample = 'this is an example\nof multi-line text\nthat space lines.\n\nAnd has more than\none paragraph.',
      sampler = 'this is an example\r\nof windows-line breaks.',
      arrayConfig = {
        lineArray: true
      };


  describe('reline tests', function() {

    // console.log(reline('>' + sample + '<'));

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

    it('should strip windows-style \\r chars.', function() {
      expect(reline(sampler)).to.not.contain('\r');
    });

  });


    // describe('Creature', function() {

    //   var h = new Heartless();

    //   var creature = new h.Creature();

    //   it('should return an object', function() {
    //     expect(typeof(creature)).to.equal('object');
    //   });

    //   it('should return all expected properties', function() {
    //     expect(creature).to.have.all.keys('name', 'locale',
    //                                       'ability', 'defeatedBy');
    //   });

    // });

    // // this is weird, since it's the saame thing as testing the Creature class?
    // describe('getHelper', function() {

    //   var h = new Heartless();

    //   var helper = h.getHelper();

    //   it('should return an object', function() {
    //     expect(typeof(helper)).to.equal('object');
    //   });

    //   it('should return all expected properties', function() {
    //     expect(helper).to.have.all.keys('name', 'locale',
    //                                     'ability', 'defeatedBy');
    //   });

    // });

    // describe('getHelpers', function() {

    //   var h = new Heartless();

    //   var helpers5 = h.getHelpers(5);
    //   var helpers1 = h.getHelpers(1);
    //   var helpers0 = h.getHelpers(0);
    //   var helpersnull = h.getHelpers();

    //   it('should return an array', function() {
    //     expect(Array.isArray(helpers5)).to.equal(true);
    //   });

    //   it('should return 5 when we ask for 5', function() {
    //     expect(helpers5.length).to.equal(5);
    //   });

    //   it('should return 1 when we ask for 1', function() {
    //     expect(helpers1.length).to.equal(1);
    //   });

    //   it('should return 0 when we ask for 0', function() {
    //     expect(helpers0.length).to.equal(0);
    //   });

    //   it('should return 0 when we don\'t pass a param', function() {
    //     expect(helpersnull.length).to.equal(0);
    //   });

    // });


    // describe('getTwain', function() {

    //   var h = new Heartless();

    //   var pkge = h.getTwain();

    //   it('should return an object', function() {
    //     expect(typeof(pkge)).to.equal('object');
    //   });

    //   it('should return all expected properties', function() {
    //     expect(pkge).to.have.all.keys('antagonist', 'helper');
    //   });

    //   it('the helper should have same ability as the antagonist\'s defeatedBy', function() {
    //     expect(pkge.helper.ability).to.equal(pkge.antagonist.defeatedBy);
    //   });

    // });

    // // these seem fairly stupid at the moment
    // // will they be useful as time goes on, as a sanity check?
    // // or am I testing the value of 0?
    // describe('getTwains', function() {

    //   var h = new Heartless();

    //   var twains5 = h.getTwains(5);
    //   var twains1 = h.getTwains(1);
    //   var twains0 = h.getTwains(0);
    //   var twainsnull = h.getTwains();

    //   it('should return an array', function() {
    //     expect(Array.isArray(twains5)).to.equal(true);
    //   });

    //   it('should return 5 when we ask for 5', function() {
    //     expect(twains5.length).to.equal(5);
    //   });

    //   it('should return 1 when we ask for 1', function() {
    //     expect(twains1.length).to.equal(1);
    //   });

    //   it('should return 0 when we ask for 0', function() {
    //     expect(twains0.length).to.equal(0);
    //   });

    //   it('should return 0 when we don\'t pass a param', function() {
    //     expect(twainsnull.length).to.equal(0);
    //   });

    // });

  // });

}();
