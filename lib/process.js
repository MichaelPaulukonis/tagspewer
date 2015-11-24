'use strict';

var conversionTable = {
	"can't":"can not",
	"won't":"will not",
	"couldn't've":"could not have",
	"i'm":"I am",
	"how'd":"how did"
};

var rules = [
	{ regex: /([azAZ]*)n\'[tT]/g, output: "$1 not" },
	{ regex: /([azAZ]*)\'[sS]/g, output: "$1 is" },
	{ regex: /([azAZ]*)\'[lL][lL]/g, output: "$1 will" },
	{ regex: /([azAZ]*)\'[rR][eE]/g, output: "$1 are" },
	{ regex: /([azAZ]*)\'[vV][eE]/g, output: "$1 have" },
	{ regex: /([azAZ]*)\'[dD]/g, output: "$1 would" }
];

var expand = function(line) {

  var tokens = line.split(/\s+/),
      ex = [];
  for (let t of tokens) {
    if (conversionTable[t.toLowerCase()]) {
      ex.push(conversionTable[t.toLowerCase()]);
    } else {
      ex.push(t);
    }
  }

  return ex.join(' '); // space (join) is not whitespace (split)

};

// TODO: document
var templatize = function(textfile, templatefile) {
  templatefile = templatefile || textfile + '.tmpl';

  var fs = require('fs');
  var pos = require('pos');

  var lexer = new pos.Lexer();
  var tagger = new pos.Tagger();

  fs.readFile(textfile, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    var lines = data.trim().split('\n');

    var posed = [];

    lines.forEach(function(line) {

      if (line[0] == '#') {       // ignore
        posed.push(line);
        return;
      }

      // TODO: expand common abbrev
      // TODO: make this optional
      // https://github.com/NaturalNode/natural/blob/6e92d2db2f4b45fe90e10bd32b7ebb41eb3d311b/lib/natural/normalizers/normalizer.js
      line = expand(line.trim().replace('\r', ''));

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

    fs.writeFile(templatefile, posed.join('\n'));

  });

};

// TODO: document
var tagjsonitize = function(template, outputfile) {

  outputfile = outputfile || template + '.json';

  var fs = require('fs');
  var pos = require('pos');
  var lexer = new pos.Lexer();
  var tagger = new pos.Tagger();

  fs.readFile(template, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    var lines = data.trim().split('\n');
    var tagbag = {};

    lines.forEach(function(line) {

      // ignore
      if (line[0] == '#') return;

      line = expand(line.trim().replace('\r', ''));

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

    fs.writeFile(outputfile, JSON.stringify(tagbag, null, 2));

  });
};


var program = require('commander');
program
  .version('0.0.1')
  .option('-t, --templatize', 'convert input file into a pos-tag template')
  .option('-j, --jsonitize', 'create sorted pos-tag file from text')
  .option('-i, --input [file]', 'input [file]', 'input.txt')
  .option('-o, --output [file]', 'output file', 'out.json')
  .parse(process.argv);

if (!process.argv.slice(2).length || !(program.templatize || program.jsonitize)) {
  program.outputHelp();
}

if (program.templatize) {
  templatize(program.input, program.output);
}

if (program.jsonitize) {
  tagjsonitize(program.input, program.output);
}
