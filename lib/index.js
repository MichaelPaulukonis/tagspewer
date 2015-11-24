// this was just a test
// require('child_process').fork('hello.js');

var Spew = require('./lib/tagspewer');

var senttags = require('./tagged.slogans.js');
// var _ = require('underscore');



var logger = function(msg) {
  if (config.log) console.log(msg);
};


var cleanup = function(text) {

  var clean = text;

  // removes spaces before punctuation
  clean = clean.replace(/\s+([.,;!])/g, '$1');
  clean = clean.replace(/\s+'\s+/g, '\'');
  // capitalize first word (leave all other caps alone)
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);

  return clean;

};


var howler = function(template, output) {

  var howled = [];
  var fs = require('fs');

  fs.readFile(template, 'utf8', function(err, data) {

    if (err) {
      return console.log(err);
    }

    var lines = data.trim().split('\n');

    lines.forEach(function(line) {

      if (line[0] === '#') {
        howled.push(line.slice(1));
        return;
      }

      var splits = line.split(':::');
      if (splits.length < 2) return;
      var tags = splits[0];
      // var originalSentence = splits[1];

      var spewed = spewer.spew(tags);
      spewed = cleanup(spewed);

      howled.push(spewed);

    });

  fs.writeFile(output, howled.join('\n'));

  });

};



var program = require('commander');
program
  .version('0.0.1')
  // .option('-t, --templatize', 'pos-tag input file into a template')
  // .option('-j, --jsonitize', 'create sorted pos-tag file from text')
  .option('-t, --template [file]', 'input [file]', 'input.txt')
  .option('-p, --postags [file]', 'pos tag-bag [file]')
  .option('-o, --output [file]', 'output file', 'out.txt')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

var lexicon = require('./' + program.postags);
var spewer = new Spew(lexicon);

howler(program.template, program.output);
