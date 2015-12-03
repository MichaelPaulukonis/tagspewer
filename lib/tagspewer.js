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
  // { "VBP": [], "NN": [], "NNP": [] }

  if(!(this instanceof Spewer)) {
    return new Spewer(lexicon);
  }

  var that = this;

  this.lexicon = (lexicon !== undefined ? lexicon : require('./lexicon.js'));

  this.spew = function(tags) {
    var out = [];
    tags = (tags === undefined ? [] : tags.split(' '));
    for (let tag of tags) {
      var word = that.getWordByTag(tag, that.lexicon);
      out.push(word);
    }
    return out.join(' ');
  };

};

Spewer.prototype.getWordByTag = function(tag, lexicon) {
  var word = tag;
  if (lexicon[tag]) {
    var words = lexicon[tag];
    word = _.sample(words);
  }
  return word;
};


module.exports = Spewer;
