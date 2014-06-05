"use strict";

function sum(a, b) {
  var areBothProvidedArgumentsNumbers = (typeof a === "number" && typeof b === "number");
  if (areBothProvidedArgumentsNumbers) {
    return a + b;
  } else {
    throw new TypeError("Something is wrong with the types.");
  }
}

function concat(a, b) {
  var areBothProvidedArgumentsStrings = (typeof a === "string" && typeof b === "string");
  if (areBothProvidedArgumentsStrings) {
    return a + b;
  } else {
    throw new TypeError("Something is wrong with the types.");
  }
}

exports.sum = sum;
exports.concat = concat;
