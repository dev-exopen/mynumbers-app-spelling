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
        if (lang === 'sv') {
            console.log(`Spell checking "${lang}"...`);
            dictionarySv((err, dict) => {
                if (err) {
                    throw err;
                }
            
                let spell = nspell(dict);
            
                spell.personal(svCustom.words.join('\n'));
				
				let spellErrors = traverseSpellCheck(langJson, spell);
				
				console.log(`Spell checking "${lang}" done.`);
				
				resolve(spellErrors);
            });
        } else if (lang === 'en-us') {
            console.log(`Spell checking "${lang}"...`);
            dictionaryEnUs((err, dict) => {
                if (err) {
                    throw err;
                }
            
                let spell = nspell(dict);
    
                spell.personal(enCustom.words.join('\n'));
            
                let spellErrors = traverseSpellCheck(langJson, spell);
				
				console.log(`Spell checking "${lang}" done.`);
				
				resolve(spellErrors);
            });
        } else {
            console.error('Language not supported.')
            reject(null);
        }
    });

    return promise;
}



function traverseSpellCheck(langJson, spell, spellErrors) {
	if (spellErrors == null) {
		spellErrors = [];
	}
    for (key in langJson) {
        if (!!langJson[key] && typeof(langJson[key])=="object") {
            traverseSpellCheck(langJson[key], spell, spellErrors);
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
						spellErrors.push(word);
                    }
                }    
            });
        }
    }
	return spellErrors;
}    

