'use strict';

/**
 Generate part-of-speech json tag-bag from text

 **/

var Tagbagify = function() {

  if(!(this instanceof Tagbagify)) {
    return new Tagbagify();
  }

};

Tagbagify.prototype.processText = function(data) {

  var pos = require('pos'),
      lexer = new pos.Lexer(),
      tagger = new pos.Tagger(),
      reline = require('./reline'),
      normalize = new require('./normalize')(),
      lines = reline(data, { lineArray: true }),
      tagbag = {};

  lines.forEach(function(line) {

    if (line[0] == '#') return; // ignore

    line = normalize(line.trim());

    var words = lexer.lex(line);
    var taggedWords = tagger.tag(words);

    for (var i in taggedWords) {
      var taggedWord = taggedWords[i];
      var part = taggedWord[1];
      var word = taggedWord[0];
      if (!tagbag[part]) {
        tagbag[part] = [];
      }
      tagbag[part].push(word);
    }

  });

  for (var tag in tagbag) {
    tagbag[tag] = tagbag[tag].sort();
  }

  return tagbag;

};


module.exports = Tagbagify;
