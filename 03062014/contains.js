"use strict";

var contains = function(element, arr) {
  var isElementInArray = false;
  arr.forEach(function(currentValue) {
    if (currentValue === element) {
      isElementInArray = true;
    }
  });

  return isElementInArray;
};

exports.contains = contains;
