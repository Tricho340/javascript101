"use strict";

var getReverseString = function(string) {
  var stringCharacters = string.split(""),
      reversedStringCharacters = [],
      i = stringCharacters.length - 1;
  for (i; i >= 0; i--) {
    reversedStringCharacters.push(stringCharacters[i]);
  }

  return reversedStringCharacters.join("");
};

var is_int_palindrome = function(n) {
  var reversedString = getReverseString(n.toString());
  var isPalindrome = (n.toString() === reversedString);

  return isPalindrome;
};

exports.is_int_palindrome = is_int_palindrome;
