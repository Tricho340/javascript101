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

var count_vowels = function(str) {
  var charactersInString = str.split(""),
      numberOfVowels = 0,
      vowels = ["a", "e", "i", "o", "u", "y"];

  charactersInString.forEach(function(currentCharacter) {
    var isCharacterAVowel = isValueInArray(vowels, currentCharacter.toLowerCase());
    if (isCharacterAVowel) {
        numberOfVowels++;
    }
  });

  return numberOfVowels;
};

exports.count_vowels = count_vowels;
