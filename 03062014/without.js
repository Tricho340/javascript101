"use strict";

var without = function(exclude, arr) {
  var isContainedInArray = function(value, array) {
    var isValueInArray = array.some(function(currentValue) { // some = does any of the values in array satisfy this condition
      return (currentValue === value);
    });
    return isValueInArray;
  };

  var arrayWithoutExcludedItems = arr.filter(function(currentValue) {
    return !isContainedInArray(currentValue, exclude);
  });

  return arrayWithoutExcludedItems;
};

exports.without = without;
