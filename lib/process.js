// convert file of mispellings in a weird format
// into rought json
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

      line = line.trim().replace('\r', '');

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

      line = line.trim().replace('\r', '');

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
  .option('-t, --templatize', 'pos-tag input file into a template')
  .option('-j, --jsonitize', 'create sorted pos-tag file from text')
  .option('-i, --input [file]', 'input [file]', 'input.txt')
  .option('-o, --output [file]', 'output file', 'out.json')
  .parse(process.argv);

// TODO: it would be nice if these two accepted a default argument
if (program.templatize) templatize(program.input, program.output);
if (program.jsonitize) tagjsonitize(program.input, program.output);
