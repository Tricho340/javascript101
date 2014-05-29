"use strict";

var getNumberOfDivisors = function(n) {
  var i = 0,
      numberOfDivisors = 0;

  for (i; i <= n; i++) {
    if (n % i === 0) {
      numberOfDivisors++;
    }
  }

  return numberOfDivisors;
};

var prime_number_of_divisors = function(n) {
  var divisorsCount = getNumberOfDivisors(n);
  var isPrime = require("./5_check_integer_prime.js").is_prime;

  return isPrime(divisorsCount);
};

exports.prime_number_of_divisors = prime_number_of_divisors;
