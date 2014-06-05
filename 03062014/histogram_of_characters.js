"use strict";

var charsHistogram = function(str) {
  var allLowercaseChars = str.toLowerCase();
  var charsInString = allLowercaseChars.split("");
  var punctuationCharacters = ["!", ",", ".", "?", " "];
  var without = require("./without.js").without;
  var stringWithoutPunctuationChars = without(punctuationCharacters, charsInString);

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

  var getNumberOfRepetitionsOfValueInArray = function(value, arr) {
    var totalNumberOfRepetitions = arr.filter(function(currentValue) {
      if (currentValue === value) {
        return true;
      }
    }).length;
    return totalNumberOfRepetitions;
  };

  var uniqueChars = getUniqueValuesFromArray(stringWithoutPunctuationChars);
  var histogramObject = {};
  uniqueChars.forEach(function(currentChar) {
    histogramObject[currentChar] = getNumberOfRepetitionsOfValueInArray(currentChar, stringWithoutPunctuationChars);
  });

  return histogramObject;
};

exports.charsHistogram = charsHistogram;
