# mynumbers-app-spelling
App spell check for MyNumbers apps.

## Usage:
```
var spellCheck = require('mynumbers-app-spelling');
var sv = require('./sv.json');

var spellCheck = require('./index.js');
var sv = require('./sv.json');

spellCheck(sv, 'sv').then(result => {
    console.log(result); // Array of spelling errors or empty array if no errors.
})

```

The second parameter is either `'sv'` or `'en-us'`.
