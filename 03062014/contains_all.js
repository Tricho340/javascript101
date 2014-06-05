"use strict";

var contains = require('./contains.js').contains;
var containsAll = function(elements, arr) {
  var doesItContainThemAll = true;
  elements.forEach(function(currentValue) {
    if (!contains(currentValue, arr)) {
      doesItContainThemAll = false;
    }
  });

  return doesItContainThemAll;
};

exports.containsAll = containsAll;
