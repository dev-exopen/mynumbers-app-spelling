var dictionarySv = require('dictionary-sv');
var dictionaryEnUs = require('dictionary-en-us');
var nspell = require('nspell');
var svCustom = require('./sv-cust.json')
// var sv = require('./sv.json');
// var en = require('./en.json');

    // Usage:
    // console.log(spell.correct('colour')); //=> false
    // console.log(spell.suggest('colour')); //=> ['color']
    // console.log(spell.correct('color')); //=> true
    // console.log(spell.correct('npm')); //=> false
    // // Add word:
    // spell.add('npm');
    // console.log(spell.correct('npm')); //=> true
    // console.log(spell.correct('nully')); //=> false
    // // Add personal dictionary:
    // spell.personal([
    //   '5',
    //   'npm',
    //   'nully',
    //   'rebase',
    //   'SHA',
    //   'stringification'
    // ].join('\n'));
    // console.log(spell.correct('nully')); //=> true

module.exports = checkSpelling;

function checkSpelling(langJson, lang) {
    var spellErrorExists = false;

    if (lang === 'sv') {
        dictionarySv((err, dict) => {
            if (err) {
                throw err;
            }
        
            var spell = nspell(dict);
        
            spell.personal(svCustom.words.join('\n'));
        
            spellErrorExists = traverseSpellCheck(langJson, spell);
            
        });
    } else if (lang === 'en-us') {
        dictionaryEnUs((err, dict) => {
            if (err) {
                throw err;
            }
        
            var spell = nspell(dict);
        
            spellErrorExists = traverseSpellCheck(langJson, spell);
        });
    } else {
        console.error('Language not supported.')
        process.exit(1);
    }

    if (spellErrorExists) {
        process.exit(2);
    }
}



function traverseSpellCheck(langJson, spell) {
    var foundSpellError = false;

    for (key in langJson) {
        if (!!langJson[key] && typeof(langJson[key])=="object") {
            traverseSpellCheck(langJson[key], spell);
        } else {
            var words = langJson[key].split(/\s/);
            words.forEach(word => {
                word = word.replace(/[\.,”!\?\(\)]/g, '').replace(/{{.+}}/g, '');
                if (word.length > 3) {
                    var ok = spell.correct(word);
                    if (ok === false) {
                        console.log(`'${word}' is not spelled correctly.`);
                        foundSpellError = true;
                    }
                }    
            });
        }
    }

    return !foundSpellError;
}    

