'use strict';

// based on node Natural's normalizer.js
// https://github.com/NaturalNode/natural/blob/master/lib/natural/normalizers/normalizer.js

var Normalize = function() {

  if(!(this instanceof Normalize)) {
    return new Normalize();
  }

  var conversionTable = {
    'can\'t': 'can not',
    'won\'t': 'will not',
    'couldn\'t\'ve': 'could not have',
    'i\'m': 'I am',
    'how\'d': 'how did'
  };

  var rules = [
    { regex: /([azAZ]*)n\'[tT]/g, output: '$1 not' },
    { regex: /([azAZ]*)\'[sS]/g, output: '$1 is' },
    { regex: /([azAZ]*)\'[lL][lL]/g, output: '$1 will' },
    { regex: /([azAZ]*)\'[rR][eE]/g, output: '$1 are' },
    { regex: /([azAZ]*)\'[vV][eE]/g, output: '$1 have' },
    { regex: /([azAZ]*)\'[dD]/g, output: '$1 would' }
  ];

  var expand = function(line) {

    line = (line != undefined ? line : '');

    /**
     very dumb space-based tokenization
     which will fail when there is punctuation involved. etc.
     so, how to handle quotes, when the apostrophe involved may well be a quote?
     The regex might not be that complicated...
     initial quote after space, or start-of-line
     ----
     single-quote (apostrophe) followed by s, or preceded by s
     and some other options. can't think of them at the moment...
     find them in the on-tagged text, then search text to do something like
     `Pitman's` => `NNP " PRP`  {{NNP possessive:"'s"}} <and drop PRP>
     `our own souls' airplanes` => `PRP$ JJ NNS " NNS` {{NNS possessive:"'"}} <and drop last NNS>
     seat of the pants --
     **/
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

    return ex.join(' ');

  };

  return expand;

};

module.exports = Normalize;
