// this was just a test
// require('child_process').fork('hello.js');


/*
 * based on spewer
 * https://github.com/dariusk/spewer
 *
 * Copyright (c) 2015 Darius Kazemi
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore');

var Spewer = function(lexicon) {
  // lexicon consists of words, sorted by tag (matching the pos library tags)
  // { "VBP": [], "NN": [], "NNP": {} }

  function getWordByTag(tag) {
    var word;
    if (lexicon[tag]) {
      var words = lexicon[tag];
      word = _.sample(words);
    }
    return word;
  }

  var spew = function(tags) {
    var out = '';
    tags = tags.split(' ');
    _.each(tags, function(tag) {
      var word = getWordByTag(tag);
      out += word + ' ';
    });
    return out.trim();
  };

  this.lexicon = lexicon;
  this.spew = spew;
};

module.exports = Spewer;
