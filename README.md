# mynumbers-app-spelling
App spell check for MyNumbers apps.

Usage:
```
var spellCheck = require('mynumbers-app-spelling');
var sv = require('./sv.json');

spellCheck(sv, 'sv', result => {
    console.log(result); // true if OK. false if spelling errors found.
});
```

The second parameter is either `'sv'` or `'en-us'`.

Output:
```
'levenrantörsfakturor' is not spelled correctly.
```

If there's any spelling errors the script will exit with an error code.

