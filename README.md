# tagspewer
Spew text based on pos-tagged-templates and associated lexicon; includes tools for parsing text and generating templates and lexicon.

Based on Darius Kazemi's [spewer](https://github.com/dariusk/spewer).


# usage
## generate lexicon and template files
 - `process -j -i d:\temp\purple.cloud.txt -o purple.json`
 - `process -t -i d:\temp\purple.cloud.txt -o purple.tmpl`

TODO: documentation on `index.js`


take this source file (`source.txt`):

```
# found @ http://www.wussu.com/poems/agh.htm
I'm with you in Rockland
         in my dreams you walk dripping from a sea-journey on the highway across America in tears to the door of my cottage in the Western night
```

`process -t -i source.txt -o sample.tmpl`

yeilds:

```
# found @ http://www.wussu.com/poems/agh.htm
NN VBP IN PRP IN NN:::I am with you in Rockland
IN PRP$ NNS PRP VB VBG IN DT NN IN DT NN IN NNP IN NNS TO DT NN IN PRP$ NN IN DT JJ NN:::in my dreams you walk dripping from a sea-journey on the highway across America in tears to the door of my cottage in the Western night
```

`I'm` was expanded to `I am` to improve legibility (see notes, below, on expansion)
The original text is appended to the template for reference only.
The template and the original text are separated by 3 colons `:::`

TODO: make this into a JSON array, with template and original text as separate keys


Likewise, `process -j -i source.txt -o sample.json` yeilds:

```
{
  "NN": [
    "I",
    "Rockland",
    "cottage",
    "door",
    "highway",
    "night",
    "sea-journey"
  ],
  "VBP": [
    "am"
  ],
  "IN": [
    "across",
    "from",
    "in",
    "in",
    "in",
    "in",
    "of",
    "on",
    "with"
  ],
  "PRP": [
    "you",
    "you"
  ],
  "PRP$": [
    "my",
    "my"
  ],
  "NNS": [
    "dreams",
    "tears"
  ],
  "VB": [
    "walk"
  ],
  "VBG": [
    "dripping"
  ],
  "DT": [
    "a",
    "the",
    "the",
    "the"
  ],
  "NNP": [
    "America"
  ],
  "TO": [
    "to"
  ],
  "JJ": [
    "Western"
  ]
}
```


`index -t sample.tmpl -p sample.json -o sample.txt` yeilds a `sample.txt`:

Due to the small size of the original, there is a lot of mirroring in this output.
With a larger lexicon, you are unlikely to see that.

```
 found @ http://www.wussu.com/poems/agh.htm
Highway am in you on door
In my tears you walk dripping in a night across a sea-journey in America in tears to the highway in my door in the Western highway
```

## use spewer with template and lexicon to generate output

# TODOs
 - (better) documentation
 - TODO: auto-minimize json file (no spaces, but each tag on sep. line. or something) That saved me nearly 50%
 - (optionally) expand contractions first?
  - http://stackoverflow.com/questions/19790188/expanding-english-language-contractions-in-python
  - https://en.wikipedia.org/wiki/Wikipedia%3aList_of_English_contractions
  - https://hackage.haskell.org/package/tokenize-0.3.0/docs/src/NLP-Tokenize-Text.html
  - looks like Node Natural has an "English Normalizer" built-in: https://github.com/NaturalNode/natural/issues/82
  - if we're doing this as node, why not require natural?
  - ..... the normalizer function takes tokens
  - but there is nothing to make acceptable tokens, as all the tokenizer split on punctuation.
   - AAAARGH
 - testing - this will require some rework of the library, but I think the command-line front-ends can all point to the same code module, making things much easier to test. Or maybe multiple modules. Keep 'em small. But tests will help demonstrate (non-command-line) usage.
 - TODO: preserve whitespace (line-breaks are kept, but leading whitespace is discarded)
  - Do I really care about this?
 - TODO: take in text as parameters -- to produce template; not sure how we'd take in a lexicon on the command-line, though; but we could take in text and the name of a lexicon? or use a default (as still seen in `spewer`?)


# contraction expansion, possesives, and (un)known entities

 - TODO: make this a separate module
 - TODO: test
 - TODO: expand this behavior
  - (`process.js` currently uses the conversionTable, but not the rules)
  - Wikipedia has a large list of contractions - they might be handled by the rules, however
 - TODO: make this optional

found this, essentially, inside of node's [Natural](https://github.com/NaturalNode/natural) module, specifically, the [normalizer.js](https://github.com/NaturalNode/natural/blob/master/lib/natural/normalizers/normalizer.js) module.

Unfortunately, it takes in tokens, and there is no extant Natural tokenizer that will produce tokens of such a form as `can't`



```
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

```


## name recognition

Goes all to heck, especially on things like `Kim Il Sung`

I don't know of any tokenizer that takes a whitelist of known phrases and their pos-tag, so this is probably best handled post-tagging, comparing the original text to the tags. Might be complicated?

## Possessive

awkward - since `John's` gets converted to 2 tags `['John', 's']` and can be replaced by anything, which is usually weird.

TODO: examples

The solution... might be the same as with names - post-tag-processing
