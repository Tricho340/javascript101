"use strict";

var getPartSum = function(partItems) {
  return partItems.reduce(function(a, b) {
    return a + b;
  });
};

var is_number_balanced = function(n) {
  var numberDigitCharacters = n.toString().split(""),
      numberDigits = numberDigitCharacters.map(function(currentValue) { return parseInt(currentValue, 10); }),
      numberOfDigits = numberDigits.length,
      leftPartDigits,
      rightPartDigits,
      arrayHalfIndex = parseInt(numberOfDigits / 2, 10),
      leftPartSum = 0,
      rightPartSum = 0;

  if (numberOfDigits === 1) {
    return true;
  }

  leftPartDigits = numberDigits.filter(function(currentValue, currentIndex) {
      return (currentIndex < arrayHalfIndex); // obviously we should have done Array.slice to split the string to arrays......
  });
  rightPartDigits = numberDigits.filter(function(currentValue, currentIndex) {
    if (numberOfDigits % 2 === 0) {
      return (currentIndex >= arrayHalfIndex);
    }

    return (currentIndex > arrayHalfIndex);
  });
  rightPartSum = getPartSum(rightPartDigits);
  leftPartSum = getPartSum(leftPartDigits);

  return (rightPartSum === leftPartSum);
};

exports.is_number_balanced = is_number_balanced;
