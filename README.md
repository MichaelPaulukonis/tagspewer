# tagspewer
Spew text based on pos-tagged-templates and associated lexicon; includes tools for parsing text and generating templates and lexicon.

Inspired by Darius Kazemi's [spewer](https://github.com/dariusk/spewer). It also includes a default lexicon that is a slightly edited version of Kazemi's, primarily modified to be tag-based.


# usage

```
var Tagspewer = require('tagspewer').tagspewer;
var tagspewer = new Tagspewer();
var cleaner = require('tagspewer').cleaner;
var tagbagify = require('tagspewer').tagbagify;
var templatify = require('tagspewer').templatify;

var template = 'DT NN IN DT NN VBD DT NN IN NN , VBN TO DT JJ NN .';

console.log(tagspewer.spew(template));
// 'such bullhide post all revaluing collided thees velours foh deadwood , teed gotta either zilch areosol .'

var lexicon = { 'JJ': ['big'], 'NNS': ['bicycles'] };
console.log(tagspewer.spew({ template: 'This is a JJ pile of NNS .', clean: true, lexicon: lexicon});
// This is a big pile of bicycles.
```

See below for sample lexicon.

Call `tagspewer.spew(tags)`, where `tags` is a space-delimited string of keywords. A default lexicon is provided with part of speech tags, as defined below. This will return a string of matching words.

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
    PRP Personal pronoun        I,you,she
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

The `process.js` file is found inside of `\lib`.

 - `process -j -i d:\temp\purple.cloud.txt -o purple.json`
 - `process -t -i d:\temp\purple.cloud.txt -o purple.tmpl`

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



# session use example
with neuromancer and moby dick (in samples), run from the lib dir

```
process -j -i ..\samples\neuromancer.txt -o ..\samples\neuromancer.json

process -t -i ..\samples\neuromancer.txt -o ..\samples\neuromancer.tmpl

index -t ..\samples\moby.dick.tmpl -p ..\samples\neuromancer.json -o ..\samples mobymancer.02.txt

index -t ..\samples\neuromancer.tmpl -p ..\samples\moby.dick.json -o ..\samples\neurodick.02.txt
```
