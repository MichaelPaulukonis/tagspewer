'use strict';

/**
 Generate part-of-speech (pos) template from text

 **/

var templatify = function() {};

templatify.prototype.processText = function(data) {

  // TODO: use node-natural if present
  var pos = require('pos'),
      reline = require('./reline'),
      normalize = new require('./normalize')(),
      lexer = new pos.Lexer(),
      tagger = new pos.Tagger();

  var lines = reline(data, { lineArray: true });

  var posed = [];

  lines.forEach(function(line) {

    if (line[0] == '#') {       // ignore
      posed.push(line);
      return;
    }

    // TODO: make this optional
    line = normalize(line.trim());

    var outpos = [];
    var words = lexer.lex(line);
    var taggedWords = tagger.tag(words);
    for (var i in taggedWords) {
      var taggedWord = taggedWords[i];
      var part = taggedWord[1];
      outpos.push(part);
    }

    var outline = outpos.join(' ') + ':::' + line;
    posed.push(outline);

  });


  return posed;

};


module.exports = templatify;
