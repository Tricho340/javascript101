var sum_of_digits = function(n) {
  var nonNegativeNumber = (n < 0) ? (n * -1) : n;
  var numberDigits = nonNegativeNumber.toString().split("");
  var sumOfDigits = 0;
  numberDigits.forEach(function(currentDigit) {
    sumOfDigits += parseInt(currentDigit);
  });
  return sumOfDigits;
};

exports.sum_of_digits = sum_of_digits;
