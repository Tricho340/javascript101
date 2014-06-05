"use strict";

var only = function(type, arr) {
  var areAllElementsFromSpecificType = arr.every(function(currentValue) {
    var isValueOfCorrectType = (typeof currentValue === type);
    return isValueOfCorrectType;
  });
  return areAllElementsFromSpecificType;
};

exports.only = only;
