"use strict";
var nth_fibonacci = function(n) {
  if ((n === 1) || (n === 2)) {
    return 1;
  }

  return nth_fibonacci(n - 1) + nth_fibonacci(n - 2);
};

exports.nth_fibonacci = nth_fibonacci;
