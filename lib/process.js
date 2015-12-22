'use strict';

// TODO: module, with a command-line front-end
// TODO: document
var templatize = function(textfile, templatefile) {
  templatefile = templatefile || textfile + '.tmpl';

  var fs = require('fs'),
      Templatize = require('./templatize'),
      templatize = new Templatize();

    var posed = templatize.processFile(textfile);
    fs.writeFile(templatefile, posed.join('\n'));

};

// TODO: module, with a command-line front-end
// TODO: document
var tagjsonitize = function(textfile, outputfile) {

  outputfile = outputfile || textfile + '.json';

  var fs = require('fs'),
      Tagbagger = require('./tagbagger'),
      tagbagger = new Tagbagger();

  // NOTE: this is synchronous
  var tagbag = tagbagger.processFile(textfile);

    fs.writeFile(outputfile, JSON.stringify(tagbag, null, 2)
                 // each tag's pieces in one long line
                 .replace(/",\n    /g, '", '));

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
