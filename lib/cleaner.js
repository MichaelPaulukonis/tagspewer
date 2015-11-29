'use strict';

// TODO: look into converting elements of https://github.com/catseye/T-Rext
// this function makes _some_ sense on a sentence level
// but fails for longer units
// and right now I'm processing a paragraph-as-line
// so it's not so hot....
var cleaner = function(text) {

  var clean = (text === undefined ? '' : text);


  var rules = [
    // removes spaces before punctuation
    { regex: /\s+([.,;:!?])/g, output: '$1' },
    // I'm not sure about this one. spaces and single-quotes. why?
    { regex: /\s+'\s+/g, output: '\'' },
    // if quote at end of line, and preced by space - remove it
    // partial heuristic
    { regex: /\s+(['"])$/g, output: '$1' }
  ];

  for (let r of rules) {
    clean = clean.replace(r.regex, r.output);
  }

  // capitalize first word (leave all other caps alone)
  // only makes sense in a sentence context
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);

  return clean;

};


module.exports = cleaner;
