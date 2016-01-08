'use strict';

var templatify = function(textfile, templatefile) {
  templatefile = templatefile || textfile + '.tmpl';

  var fs = require('fs'),
      Templatify = require('./templatify'),
      templatify = new Templatify();

  fs.readfile(texfile, (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    }

    var posed = templatify.processFile(data);
    fs.writeFile(templatefile, posed.join('\n'));

  });
};

var tagbagify = function(textfile, outputfile) {

  outputfile = outputfile || textfile + '.json';

  var fs = require('fs'),
      Tagbagify = require('./tagbagify'),
      tagbagify = new Tagbagify();

  fs.readFile(textfile, (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    }

    var tagbag = tagbagify.processText(data);

    fs.writeFile(outputfile, JSON.stringify(tagbag, null, 2)
                 // each tag's pieces in one long line
                 .replace(/",\n    /g, '", '));

  });

};


var program = require('commander');
program
  .version('0.0.1')
  .option('-t, --templatify', 'convert input file into a pos-tag template')
  .option('-j, --jsonitize', 'create sorted pos-tag file from text')
  .option('-i, --input [file]', 'input [file]', 'input.txt')
  .option('-o, --output [file]', 'output file', 'out.json')
  .parse(process.argv);


if (!process.argv.slice(2).length || !(program.templatify || program.jsonitize)) {
  program.outputHelp();
}

if (program.templatify) {
  templatify(program.input, program.output);
}

if (program.jsonitize) {
  tagbagify(program.input, program.output);
}
