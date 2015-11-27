'use strict';

// based on node Natural's normalizer.js
// https://github.com/NaturalNode/natural/blob/master/lib/natural/normalizers/normalizer.js

var Normalize = function() {

  if(!(this instanceof Normalize)) {
    return new Normalize();
  }

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

    line = (line != undefined ? line : '');

    // very dumb space-based tokenization
    // which will fail when there is punctuation involved. etc.
    // so, how to handle quotes, when the apostrophe involved may well be a quote?
    var tokens = line.split(/\s+/),
        ex = [];

    for (let t of tokens) {
      if (conversionTable[t.toLowerCase()]) {
        ex.push(conversionTable[t.toLowerCase()]);
      } else {
        var matched = false;
        for (let r = 0, rule_count = rules.length; r < rule_count; r++) {
          let rule = rules[r];
          if (t.match(rule.regex)) {
            ex.push(t.replace(rule.regex, rule.output));
            matched = true;
            break;
          }
        }
        if (!matched) {
          ex.push(t);
        }
      }    }

    return ex.join(' '); // space (join) is not whitespace (split)

  };

  return expand;

};

module.exports = Normalize;
