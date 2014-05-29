"use strict";

exports.fibonacciExerciseTest = function(test) {
  var nth_fibonacci = require('./1_fib.js').nth_fibonacci;
  test.equal(nth_fibonacci(1), 1);
  test.equal(nth_fibonacci(2), 1);
  test.equal(nth_fibonacci(3), 2);
  test.equal(nth_fibonacci(10), 55);
  test.done();
};

exports.sumOfDigitsExerciseTest = function(test) {
  var sum_of_digits = require('./2_sum_digits.js').sum_of_digits;
  test.equal(sum_of_digits(1325132435356), 43);
  test.equal(sum_of_digits(123), 6);
  test.equal(sum_of_digits(6), 6);
  test.equal(sum_of_digits(-10), 1);
  test.done();
};

exports.sumOfMinAndMaxElementExerciseTest = function(test) {
  var sum_of_min_and_max = require('./3_sum_min_max_elements.js').sum_of_min_and_max;
  test.equal(sum_of_min_and_max([1, 2, 3, 4, 5, 6, 7, 8, 9]), 10);
  test.equal(sum_of_min_and_max([-10, 5, 10, 100]), 90);
  test.equal(sum_of_min_and_max([1]), 2);
  test.done();
};

exports.sumOfDivisorsExerciseTest = function(test) {
  var sum_of_divisors = require('./4_sum_divisors_integer.js').sum_of_divisors;
  test.equal(sum_of_divisors(8), 15);
  test.equal(sum_of_divisors(7), 8);
  test.equal(sum_of_divisors(1), 1);
  test.equal(sum_of_divisors(1000), 2340);
  test.done();
};

exports.isIntegerPrimeExerciseTest = function(test) {
  var is_prime = require('./5_check_integer_prime.js').is_prime;
  test.equal(is_prime(1), false);
  test.equal(is_prime(2), true);
  test.equal(is_prime(8), false);
  test.equal(is_prime(11), true);
  test.equal(is_prime(-10), false);
  test.done();
};

exports.isDivisorsPrimeExerciseTest = function(test) {
  var prime_number_of_divisors = require('./6_check_prime_number_divisors.js').prime_number_of_divisors;
  test.equal(prime_number_of_divisors(7), true);
  test.equal(prime_number_of_divisors(8), false);
  test.equal(prime_number_of_divisors(9), true);
  test.done();
};

exports.isIntPalindromeExerciseTest = function(test) {
  var is_int_palindrome = require('./7_integer_palindromes.js').is_int_palindrome;
  test.equal(is_int_palindrome(1), true);
  test.equal(is_int_palindrome(42), false);
  test.equal(is_int_palindrome(100001), true);
  test.equal(is_int_palindrome(999), true);
  test.equal(is_int_palindrome(123), false);
  test.done();
};

exports.isNumberBalancedExerciseTest = function(test) {
  var is_number_balanced = require('./8_is_number_balanced.js').is_number_balanced;
  test.equal(is_number_balanced(9), true);
  test.equal(is_number_balanced(11), true);
  test.equal(is_number_balanced(13), false);
  test.equal(is_number_balanced(121), true);
  test.equal(is_number_balanced(4518), true);
  test.equal(is_number_balanced(28471), false);
  test.equal(is_number_balanced(1238033), true);
  test.done();
};

exports.countingSubstringsExerciseTest = function(test) {
  var count_substrings = require('./9_counting_substrings.js').count_substrings;
  test.equal(count_substrings("This is a test string", "is"), 2);
  test.equal(count_substrings("babababa", "baba"), 2);
  test.equal(count_substrings("JavaScript is an awesome language to program in!", "o"), 3);
  test.equal(count_substrings("We have nothing in common!", "really?"), 0);
  test.equal(count_substrings("This is this and that is this", "this"), 2);

  test.done();
};

exports.countVowelsExerciseTest = function(test) {
  var count_vowels = require('./10_vowels_in_a_string.js').count_vowels;
  test.equal(count_vowels("JavaScript"), 3);
  test.equal(count_vowels("Theistareykjarbunga"), 8);
  test.equal(count_vowels("grrrrgh"), 0);
  test.equal(count_vowels("Github is the second best thing that happend to programmers, after the keyboard!"), 22);
  test.equal(count_vowels("A nice day to code!"), 8);

  test.done();
};

exports.countConsonantsExerciseTest = function(test) {
  var count_consonants = require('./11_consonants_in_a_string.js').count_consonants;
  test.equal(count_consonants("JavaScript"), 7);
  test.equal(count_consonants("Theistareykjarbunga"), 11);
  test.equal(count_consonants("grrrrgh"), 7);
  test.equal(count_consonants("Github is the second best thing that happend to programmers, after the keyboard!"), 44);
  test.equal(count_consonants("A nice day to code!"), 6);

  test.done();
};
