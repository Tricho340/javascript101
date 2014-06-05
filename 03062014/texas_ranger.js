"use strict";

var range = function(from, to) {
  if (from === to) { // we have reached the first number
    return [from];
  } else {
    return range(from, (to - 1)).concat([to]); // always append the current number to the existing array
  }
};

exports.range = range;
