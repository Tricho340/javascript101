"use strict";

var pluck = function(property, arr) {
  var arrayWithProperty = arr.map(function(currentValue) {
    return currentValue[property];
  });

  return arrayWithProperty;
};

exports.pluck = pluck;
