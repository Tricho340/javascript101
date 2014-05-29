"use strict";

var sum_of_min_and_max = function(array) {
  var sortedArray = array.sort(function(a, b) {
    a = parseInt(a, 10);
    b = parseInt(b, 10);
    if (a > b) {
      return -1;
    }
    if (a === b) {
      return 0;
    }

    return 1;
  });
  var maxElement = sortedArray[sortedArray.length - 1];
  var minElement = sortedArray[0];

  var sum = minElement + maxElement;
  return sum;
};

exports.sum_of_min_and_max = sum_of_min_and_max;
