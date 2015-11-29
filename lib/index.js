'use strict';

var logger = function(msg) {
  if (config.log) console.log(msg);
};


// TODO: a better name
// this is an artifact from working with "Howl" in 2015.04
var howler = function(template, output, spewer) {

  var howled = [],
      fs = require('fs'),
      cleaner = require('./cleaner');

  fs.readFile(template, 'utf8', function(err, data) {

    if (err) {
      return console.log(err);
    }

    // NOTE: lines !== sentence
    // could be a paragraph, could be a sentence fragment
    var lines = data.trim().split('\n');

    for (let line of lines) {

      if (line[0] === '#') {
        howled.push(line.slice(1));
        continue;
      }

      var splits = line.split(':::');
      if (splits.length < 2) continue;
      var tags = splits[0];

      var spewed = spewer.spew(tags);
      spewed = cleaner(spewed);

      howled.push(spewed);

    }

    console.log(output);

    fs.writeFile(output, howled.join('\n'));

  });

};



var program = require('commander');
program
  .version('0.0.2')
  .option('-t, --template [file]', 'input [file]', 'input.txt')
  .option('-p, --postags [file]', 'pos tag-bag [file]')
  .option('-o, --output [file]', 'output file', 'out.txt')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}


var Spew = require('./tagspewer');

var lexicon = require('./' + program.postags);
var spewer = new Spew(lexicon);

howler(program.template, program.output, spewer);
