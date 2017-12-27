var dictionarySv = require('dictionary-sv');
var dictionaryEnUs = require('dictionary-en-us');
var nspell = require('nspell');
var svCustom = require('./sv-cust.json')
var enCustom = require('./en-cust.json')

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
    var promise = new Promise((resolve, reject) => {
        let spellErrorExists = false;

        if (lang === 'sv') {
            console.log('Spell checking sv...');
            dictionarySv((err, dict) => {
                if (err) {
                    throw err;
                }
            
                let spell = nspell(dict);
            
                spell.personal(svCustom.words.join('\n'));
            
                spellErrorExists = traverseSpellCheck(langJson, spell);
    
                console.log('Spell check done!');
                resolve(!spellErrorExists);
            });
        } else if (lang === 'en-us') {
            console.log('Spell checking en-us...');
            dictionaryEnUs((err, dict) => {
                if (err) {
                    throw err;
                }
            
                let spell = nspell(dict);
    
                spell.personal(enCustom.words.join('\n'));
            
                spellErrorExists = traverseSpellCheck(langJson, spell);
    
                console.log('Spell check done!');
                resolve(!spellErrorExists);
            });
        } else {
            console.error('Language not supported.')
            reject(null);
        }
    });

    return promise;
}



function traverseSpellCheck(langJson, spell) {
    let foundSpellError = false;

    for (key in langJson) {
        if (!!langJson[key] && typeof(langJson[key])=="object") {
            traverseSpellCheck(langJson[key], spell);
        } else {
            let words = langJson[key].split(/\s/);
            words.forEach(word => {
                word = word
                    .replace(/[\.,”!\?\(\)]/g, '')
                    .replace(/{{.+}}/g, '')
                    .replace(/<.+>/g, '')
                    .replace(/.+}}/g, '')
                    .replace(/{{.+/g, '');
                if (word.length > 3) {
                    let ok = spell.correct(word);
                    if (ok === false) {
                        console.log(`'${word}' is not spelled correctly.`);
                        foundSpellError = true;
                    }
                }    
            });
        }
    }

    return foundSpellError;
}    

