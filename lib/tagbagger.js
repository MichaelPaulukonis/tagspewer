'use strict';

/**
 Generate part-of-speech json tag-bag from text

 **/

var tagbagger = function() {};

tagbagger.prototype.processText = function(data) {

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

  return JSON.stringify(tagbag, null, 2)
  // each tag's pieces in one long line
    .replace(/",\n    /g, '", ');

};

tagbagger.prototype.processFile = function(textfile) {

  var that = this;

  var data = require('fs').readFileSync(textfile, 'utf8');

  return that.processText(data);

};


module.exports = tagbagger;
