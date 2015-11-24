# tagspewer
Spew text based on pos-tagged-templates and associated lexicon; includes tools for parsing text and generating templates and lexicon.

Based on Darius Kazemi's [spewer](https://github.com/dariusk/spewer).


# usage
## generate lexicon and template files
 - `process -j -i d:\temp\purple.cloud.txt -o purple.json`
 - `process -t -i d:\temp\purple.cloud.txt -o purple.tmpl`

TODO: documentation on `index.js`

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
