var spellCheck = require('./index.js');
var sv = require('./sv.json');
var en = require('./en.json');

spellCheck(sv, 'sv').then(result => {
    console.log(result); // Array of spelling errors or empty array if no errors.
})

spellCheck(en, 'en-us').then(result => {
    console.log(result); // Array of spelling errors or empty array if no errors.
})
