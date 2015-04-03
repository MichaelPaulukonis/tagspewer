'use strict';



var lexicon = require('../lib/lexicon.js');
var Spew = require('../lib/tagspewer.js');
var spewer = new Spew(lexicon);

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['spewer'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'basics': function(test) {
    test.expect(4);
    // tests here
    test.equal(typeof spewer, 'object', 'expected an object');
    test.equal(typeof spewer.spew, 'function', 'expected `spew` to be a function');
    test.equal(spewer.spew('JJ NN').split(' ').length, 2, 'expected 2 words back from "JJ NN"');
    test.equal(spewer.spew('junk'), '', 'expected an empty string when passed junk tags');
    test.done();
  },
};
