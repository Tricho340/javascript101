"use strict";

var find = function(predicate, arr) {
  var firstValueToMeetPredicateCriteria;
  arr.forEach(function(currentValue) {
    if (predicate(currentValue)) {
      if (typeof firstValueToMeetPredicateCriteria === "undefined") { // store only first value that meets predicate criteria. ignore all the others.
        firstValueToMeetPredicateCriteria = currentValue;
      }
    }
  });

  return firstValueToMeetPredicateCriteria;
};

exports.find = find;
