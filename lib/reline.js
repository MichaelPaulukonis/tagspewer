'use strict';

var thingy = function() {

  var fs = require('fs'),
      textfile = '../samples/tiny.multi.txt';
  data = fs.readFileSync(textfile, 'utf8');

  // still not correct - spurious linebreaks
  var lines = data.trim()
        .replace(/\r/g, '')
        .replace(/\n([^\n])/g, ' $1')
        .split('\n');

  console.log(lines);

};

var altmethod = function(text) {

  var lines = text.split('\n'),
      newlines = [],
      curline = [];

   for (let i = 0, lineslength = lines.length; i < lineslength; i++) {
    let line = lines[i].trim();
    if (line.length == 0) {
      newlines.push(curline.join(' '));
      curline = [];
    } else {
      curline.push(line);
      if (i === lineslength - 1) {
        newlines.push(curline.join(' '));
      }
    }
  }

  return newlines;

};


/**
 takes in multi-line, word-wrapped text
 returns paragraphs as single lines
 optionally set blank-lines between paragraphs
 **/
var debreak = function(text, config) {

  var cleanText;
  if (config === undefined) {
    config = {
      lineArary: false
    };
  }

  // if (true) {
    cleanText = altmethod(text).join('\n');
  // } else {
  //   // cleanup
  //   cleanText = text.replace(/\r/g, '')
  //     .replace(/\n([^\n])/g, ' $1');
  // }

  if (config.lineArray) {
    cleanText = cleanText.split('\n');
  }

  return cleanText;

};


module.exports = debreak;
