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

  if(!(this instanceof Spewer)) {
    return new Spewer(lexicon);
  }


  function getWordByTag(tag) {
    var word = tag;
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

  this.lexicon = (lexicon !== undefined ? lexicon : require('./lexicon.js'));
  this.spew = spew;

};

module.exports = Spewer;
