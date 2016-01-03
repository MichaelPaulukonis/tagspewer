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
    { regex: /\s+([.,;:!?])/g, output: '$1' }
    // I'm not sure about this one. spaces and single-quotes. why?
    // { regex: /\s+'\s+/g, output: '\'' },
    // if quote at end of line, and preced by space - remove it
    // partial heuristic
    ,{ regex: /\s+(['"])$/g, output: '$1' }
  ];

  var Tokenizer = require('sentence-tokenizer');
  var st = new Tokenizer('dummy');

  var cleanSentences = function(text) {

    st.setEntry(text);
    var sentences = st.getSentences();

    var cleaned = [],
        skipSentence = false;

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
          skipSentence = true;
        }

        cleaned.push(sentence);
      }
    }

    return cleaned.join(' ').trim();

  };

  var cleanQuotes = function(text) {

    // TODO: implement

    // run through text, pushing quotes onto stack
    // when matching quote is found, pop off stack, cleaning up puncs
    // if no match quote found, delete

    // this can't be done straght as "explained" above....

    // clean up spaces before/after quotes
    // after the first, before the second

    // go through text char by char
    // quote triggers flag
    // flag on, delete the next char, if space
    // flag off, delete the previous char, if space

    var status = { opening: 'opening',
                   open: 'open',
                   closing: 'closing',
                   off: 'off'
                 };

    var clean = [],
        dblFlag = status.off,
        snglFlag = status.off;

    for (var i = 0, tlength = text.length; i < tlength; i++) {

      var c = text[i];
      if (c === '"') {
        dblFlag = (dblFlag === status.off ? status.opening :
                    (dblFlag === status.open ? status.closing : status.off));
      }
      if (c === '\'') {
        snglFlag = (snglFlag === status.off ? status.opening :
                    (snglFlag === status.open ? status.closing : status.off));
      }

      if (i < tlength && snglFlag === status.opening && text[i+1] === ' ') {
        snglFlag = status.open;
        clean.push(c);
        i = i + 1;
      } else if (i > 0 && snglFlag === status.closing && text[i-1] === ' ') {
        snglFlag = status.off;
        clean.pop();
        clean.push(c);
      } else if (i < tlength && dblFlag === status.opening && text[i+1] === ' ') {
        dblFlag = status.open;
        clean.push(c);
        i = i + 1;
      } else if (i > 0 && dblFlag === status.closing && text[i-1] === ' ') {
        dblFlag = status.off;
        clean.pop();
        clean.push(c);
      } else {
        clean.push(c);
      }

      // TODO: reduce the code footprint
      // can we have intersecting quotes?

    }

    return clean.join('');

  };


  clean = cleanSentences(clean);
  clean = cleanQuotes(clean);

  return clean;


};


module.exports = cleaner;
