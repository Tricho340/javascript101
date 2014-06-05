"use strict";

var wordsHistogram = function(str) {
  var wordsInHistogram = str.split(" ");
  var punctuationCharacters = ["!", ",", ".", "?"];
  var without = require("./without.js").without;
  var histogramObject = {};

  var isItemInArray = function(item, arr) {
    return arr.some(function(currentValue) {
      return (currentValue === item);
    });
  };

  var getUniqueValuesFromArray = function(array) {
    var uniqueValues = [];
    array.forEach(function(currentValue) {
      if (!isItemInArray(currentValue, uniqueValues)) {
        uniqueValues.push(currentValue);
      }
    });

    return uniqueValues;
  };

  var getWordWithoutPunctuationCharacters = function(word) {
    var wordCharacters = word.split("");
    var wordWithoutPunctuationChars = without(punctuationCharacters, wordCharacters).join("");
    return wordWithoutPunctuationChars;
  };

  var modifiedWords = wordsInHistogram.map(function(currentWord) {
    var lowerCaseWord = currentWord.toLowerCase();
    var wordWithNoPunctuationCharacters = getWordWithoutPunctuationCharacters(lowerCaseWord);
    return wordWithNoPunctuationCharacters;
  });
  var uniqueWords = getUniqueValuesFromArray(modifiedWords);

  var getNumberOfRepetitionsOfValueInArray = function(value, arr) {
    var totalNumberOfRepetitions = arr.filter(function(currentValue) {
      if (currentValue === value) {
        return true;
      }
    }).length;
    return totalNumberOfRepetitions;
  };

  uniqueWords.forEach(function(currentModifiedWord) {
    histogramObject[currentModifiedWord] = getNumberOfRepetitionsOfValueInArray(currentModifiedWord, modifiedWords);
  });

  return histogramObject;
};

exports.wordsHistogram = wordsHistogram;
