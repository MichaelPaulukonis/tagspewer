'use strict';

// TODO: module, with a command-line front-end
// TODO: document
var templatize = function(textfile, templatefile) {
  templatefile = templatefile || textfile + '.tmpl';

  var fs = require('fs'),
      // TODO: optionally use natural (if installed)
      pos = require('pos'),
      reline = require('./reline'),
      normalize = new require('./normalize')(),
      lexer = new pos.Lexer(),
      tagger = new pos.Tagger();

  fs.readFile(textfile, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    var lines = reline(data, { lineArray: true });

    var posed = [];

    lines.forEach(function(line) {

      if (line[0] == '#') {       // ignore
        posed.push(line);
        return;
      }

      // TODO: make this optional
      line = normalize(line.trim()); // .replace('\r', ''));

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

// TODO: module, with a command-line front-end
// TODO: document
var tagjsonitize = function(template, outputfile) {

  outputfile = outputfile || template + '.json';

  var fs = require('fs'),
      pos = require('pos'),
      lexer = new pos.Lexer(),
      tagger = new pos.Tagger(),
      reline = require('./reline'),
      normalize = new require('./normalize')();


  fs.readFile(template, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    // t.replace(/\n([^\\n])/g, ' $1')

    // var lines = data.trim().split('\n');
    // var lines = data.trim()
    //       .replace(/\r/g, '')
    //       .replace(/\n([^\\n])/g, ' $1')
    //       .split('\n');
    var lines = reline(data, { lineArray: true });
    var tagbag = {};

    lines.forEach(function(line) {

      // ignore
      if (line[0] == '#') return;

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

    fs.writeFile(outputfile, JSON.stringify(tagbag, null, 2)
                 // each tag's pieces in one long line
                 .replace(/",\n    /g, '", '));

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
