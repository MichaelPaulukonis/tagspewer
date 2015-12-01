'use strict';

// TODO: look into converting elements of https://github.com/catseye/T-Rext
// this function makes _some_ sense on a sentence level
// but fails for longer units
// and right now I'm processing a paragraph-as-line
// so it's not so hot....
var cleaner = function(text) {

  if (text === undefined || text.trim().length === 0) { return ''; }

  var clean = text;


  var rules = [
    // removes spaces before punctuation
    { regex: /\s+([.,;:!?])/g, output: '$1' },
    // I'm not sure about this one. spaces and single-quotes. why?
    { regex: /\s+'\s+/g, output: '\'' },
    // if quote at end of line, and preced by space - remove it
    // partial heuristic
    { regex: /\s+(['"])$/g, output: '$1' }
  ];

  var Tokenizer = require('sentence-tokenizer');
  var st = new Tokenizer('dummy');
  st.setEntry(clean);
  var sentences = st.getSentences();

  var cleaned = [],
      skipSentence = false;
  // for (let sentence of sentences) {
  for (let i = 0, sl = sentences.length; i < sl; i++) {
    if (skipSentence) {
      skipSentence = false;
    } else {
      let sentence = sentences[i];
      for (let r of rules) {
        sentence = sentence.replace(r.regex, r.output);
      }
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);

      if (i < sentences.length - 1 && sentences[i+1].match(/^['"]$/)) {
        sentence += sentences[i+1];
        // console.log(sentence);
        skipSentence = true;
      }

      cleaned.push(sentence);
    }
  }

  return cleaned.join(' ').trim();

  // for (let r of rules) {
  //   clean = clean.replace(r.regex, r.output);
  // }

  // // capitalize first word (leave all other caps alone)
  // // only makes sense in a sentence context
  // clean = clean.charAt(0).toUpperCase() + clean.slice(1);

  // return clean;

};


module.exports = cleaner;
