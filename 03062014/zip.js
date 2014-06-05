"use strict";

var zip = function() {
  // The arguments object is not an Array.
  // It is similar to an Array, but does not have any Array properties except length.
  // For example, it does not have the pop method. However it can be converted to a real Array:
  var argumentsArray = Array.prototype.slice.call(arguments);
  var resultArray = [];
  argumentsArray.forEach(function(currentArgument) {
    currentArgument.forEach(function(currentElement, currentElementIndex) {
      resultArray[currentElementIndex] = resultArray[currentElementIndex] || [];
      resultArray[currentElementIndex] = resultArray[currentElementIndex].concat([currentElement]);
    });
  });

  return resultArray;
};

exports.zip = zip;
