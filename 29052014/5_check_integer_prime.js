"use strict";

var is_prime = function(n) {
  var i = 0,
      halfNumber = parseInt((n / 2), 10);

  if (n === 1 || n < 0) {
    return false;
  }

  for (i; i <= halfNumber; i++) {
    if (n % i === 0 && i !== 1) {
      return false;
    }
  }

  return true;
};

exports.is_prime = is_prime;
