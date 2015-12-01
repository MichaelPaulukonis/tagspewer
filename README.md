# tagspewer
Spew text based on pos-tagged-templates and associated lexicon; includes tools for parsing text and generating templates and lexicon.

Based on Darius Kazemi's [spewer](https://github.com/dariusk/spewer).


# usage

Call `tagspewer.spew(tags)`, where `tags` is a space-delimited string of part of speech tags, as defined below. This will return a string of matching words.

    CC Coord Conjuncn           and,but,or
    IN Preposition              of,in,by
    JJ Adjective                big
    JJR Adj., comparative       bigger
    JJS Adj., superlative       biggest
    MD Modal                    can,should
    NN Noun, sing. or mass      dog
    NNP Proper noun, sing.      Edinburgh
    NNPS Proper noun, plural    Smiths
    NNS Noun, plural            dogs
    PDT Predeterminer           all, both
    PRP Personal pronoun         I,you,she
    RB Adverb                   quickly
    RBR Adverb, comparative     faster
    RBS Adverb, superlative     fastest
    RP Particle                 up,off
    VB verb, base form          eat
    VBD verb, past tense        ate
    VBG verb, gerund            eating
    VBN verb, past part         eaten
    VBP Verb, present           eat
    VBZ Verb, present           eats
    WDT Wh-determiner           which,that
    WP Wh pronoun               who,what
    WRB Wh-adverb               how,where


## generate lexicon and template files
 - `process -j -i d:\temp\purple.cloud.txt -o purple.json`
 - `process -t -i d:\temp\purple.cloud.txt -o purple.tmpl`

TODO: more documentation on `index.js`

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
    "I", "Rockland", "cottage", "door", "highway", "night", "sea-journey"
  ],
  "VBP": [
    "am"
  ],
  "IN": [
    "across", "from", "in", "in", "in", "in", "of", "on", "with"
  ],
  "PRP": [
    "you", "you"
  ],
  "PRP$": [
    "my", "my"
  ],
  "NNS": [
    "dreams", "tears"
  ],
  "VB": [
    "walk"
  ],
  "VBG": [
    "dripping"
  ],
  "DT": [
    "a", "the", "the", "the"
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
 - TODO: auto-minimize json file (no spaces, but each tag on sep. line. or something) That saved me nearly 50% (done-ish, not optional)
 - (optionally) expand contractions first? (donish, not optional)
  - http://stackoverflow.com/questions/19790188/expanding-english-language-contractions-in-python
  - https://en.wikipedia.org/wiki/Wikipedia%3aList_of_English_contractions
  - https://hackage.haskell.org/package/tokenize-0.3.0/docs/src/NLP-Tokenize-Text.html
  - looks like Node Natural has an "English Normalizer" built-in: https://github.com/NaturalNode/natural/issues/82
  - if we're doing this as node, why not require natural?
  - ..... the normalizer function takes tokens
  - but there is nothing to make acceptable tokens, as all the tokenizer split on punctuation.
   - AAAARGH
 - however, if I'm tokenizing according to my own crappy regex, and passing to _my_ normalizer, why not pass _those_ tokens to Natural, if it exists?
 - testing - this will require some rework of the library, but I think the command-line front-ends can all point to the same code module, making things much easier to test. Or maybe multiple modules. Keep 'em small. But tests will help demonstrate (non-command-line) usage.
 - TODO: preserve whitespace (line-breaks are kept, but leading whitespace is discarded)
  - Do I really care about this?
 - TODO: take in text as parameters -- to produce template; not sure how we'd take in a lexicon on the command-line, though; but we could take in text and the name of a lexicon? or use a default (as still seen in `spewer`?)
 - TODO: single point of entry for various modules
 - TODO: assume template ends with `.tmpl` assume pos-bag ends with `.json`
  - error, of course, if not found
 - TODO: option to generate both pos-tag-bag and template in one-pass
 - TODO: look into converting catseye/cpressey's [T-Rext](https://github.com/catseye/T-Rext/blob/master/src/t_rext/processors.py)
  - it's a text-cleaner
 - TODO: keep original template punctuation? It's weird to drop it into a tag-bag. And solves sooooo many problems.
 - TODO: once a replacement word is picked, keep using that for the same original word ?
  - is this beyond scope?
  - store tag and original word, so template becomes
   - {tag: 'NN', word: 'tomb'}
   - or some other model that takes up less space
   - we could drop the whole `:::<original text>` thing for this model
  - processor would have to be able to recognize which form of template has been provided
 - TODO: the main module version of spewer should be able to take a template as a string or array
 - TODO: clean up the default lexicon
  - this was part of Kazemi's original [spewer](https://github.com/dariusk/spewer) code, but has some ... interesting "features"


# contraction expansion, possesives, and (un)known entities

 - DONE: make this a separate module
 - DONE: test [crudely]
 - TODO: expand this behavior
  - (`process.js` currently uses the conversionTable, but not the rules - DONE)
  - Wikipedia has a large list of contractions - they might be handled by the rules, however
 - TODO: make this optional

found this, essentially, inside of node's [Natural](https://github.com/NaturalNode/natural) module, specifically, the [normalizer.js](https://github.com/NaturalNode/natural/blob/master/lib/natural/normalizers/normalizer.js) module.


 - http://stackoverflow.com/questions/19790188/expanding-english-language-contractions-in-python
  - https://en.wikipedia.org/wiki/Wikipedia%3aList_of_English_contractions


## name recognition

Goes all to heck, especially on things like `Kim Il Sung`

I don't know of any tokenizer that takes a whitelist of known phrases and their pos-tag, so this is probably best handled post-tagging, comparing the original text to the tags. Might be complicated?

We might want to do PRE-processing, to condense multi-part (known) names down to a single tag-unit, then re-expand post tagging. If expansion is needed at all?


## Possessive

awkward - since `John's` gets converted to 2 tags `['John', 's']` and can be replaced by anything, which is usually weird.

```
IN IN DT JJ NNS IN NNP " PRP NN , WP$
throughout with those giddy shapes of Pitman's shorthand, whose
```

where we see `Pitman's` => `NNP " PRP`

in the `PRP` tag-bag, there will a whole bunch of "s"s, with other non-useful replacements in the possessive context:

```
  "PRP": [
    "They", "They", "They", "They", "he", "it", "it", "it", "itself", "me", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "s", "them", "them", "them", "you", "you"
  ],
```

alternate case: `our own souls' airplanes` => `PRP$ JJ NNS " NNS`

The solution... might be the same as with names - post-tag-processing


# session use example
with neuromancer and moby dick (in samples), run from the lib dir

```
process -j -i ..\samples\neuromancer.txt -o ..\samples\neuromancer.json

process -t -i ..\samples\neuromancer.txt -o ..\samples\neuromancer.tmpl

index -t ..\samples\moby.dick.tmpl -p ..\samples\neuromancer.json -o ..\samples mobymancer.02.txt

index -t ..\samples\neuromancer.tmpl -p ..\samples\moby.dick.json -o ..\samples\neurodick.02.txt
```
