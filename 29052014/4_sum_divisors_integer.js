"use strict";

var sum_of_divisors = function(n) {
  var i = 0,
      sumOfDivisors = 0,
      halfNumber = parseInt((n / 2), 10);

  for (i; i <= halfNumber; i++) {
    if (n % i === 0) {
      sumOfDivisors += i;
    }
  }

  return sumOfDivisors + n;
};

exports.sum_of_divisors = sum_of_divisors;
