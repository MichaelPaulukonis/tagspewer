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

  var that = this,
      cleaner = require('./cleaner');

  this.lexicon = (lexicon !== undefined ? lexicon : require('./lexicon.js'));

  this.spew = function(opts) {

    var out = [],
        tags = [],
        lexicon = that.lexicon,
        clean = false,
        regex = /\s+/ig;

    if (opts !== undefined) {
      // if a string is passed in, it's a template
      if (typeof opts === 'string') {
        tags = opts.split(regex);
      } else {
        // if an object is passed in, it's an options object
        if (opts.template !== undefined) {
          tags = opts.template.split(regex);
        }
        if (opts.lexicon !== undefined) {
          lexicon = opts.lexicon;
        }
        if (opts.clean !== undefined) {
          clean = opts.clean;
        }
      }
    }

    for (let tag of tags) {
      var word = that.getWordByTag(tag, lexicon);
      out.push(word);
    }
    var sentence = out.join(' ');
    if (clean) {
      sentence = cleaner(sentence);
    };
    return sentence;
  };

};

Spewer.prototype.getWordByTag = function(tag, lexicon) {
  var word = tag;
  if (lexicon[tag]) {
    var words = lexicon[tag];
    // auto-wrap string values, eg: { 'NNP': 'whales' }
    if (typeof words === 'string') { words = [words]; }
    word = _.sample(words);
  }
  return word;
};


module.exports = Spewer;
