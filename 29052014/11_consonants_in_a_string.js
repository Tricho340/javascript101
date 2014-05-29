"use strict";

var isValueInArray = function(array, value) {
  var matches = array.filter(function(currentValue) {
    if (currentValue === value) {
      return true;
    }

    return false;
  });

  return (matches.length > 0);
};

var count_consonants = function(str) {
  var charactersInString = str.split(""),
      numberOfConsonants = 0,
      vowels = ["a", "e", "i", "o", "u", "y"],
      punctuationCharacters = ["!", ".", "?", " ", ","];

  charactersInString.forEach(function(currentCharacter) {
    var isCharacterNotAVowel = (!isValueInArray(vowels, currentCharacter.toLowerCase()));
    var isCharacterNotAPunctuationCharacter = (!isValueInArray(punctuationCharacters, currentCharacter.toLowerCase()));
    if (isCharacterNotAVowel && isCharacterNotAPunctuationCharacter) {
        numberOfConsonants++;
    }
  });

  return numberOfConsonants;
};

exports.count_consonants = count_consonants;
