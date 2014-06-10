"use strict";

String.prototype.capitalize = function() {
  return this.toUpperCase();
};

String.prototype.dasherize = function() {
  return this.replace(/_/g, "-");
};

String.prototype.times = function(amount) {
  var strings = [],
      i = 0;
  for (i; i < amount; i++) {
    strings.push(this);
  }
  return strings.join(" ");
};

String.prototype.blank = function() {
  var stringWithNoWhitespace = this.trim();
  return (stringWithNoWhitespace.length === 0);
};

Array.prototype.first = function() {
 if (this.length === 0) {
  throw "No first item in this array!";
 }

 return this[0];
};

var rangeFunc = function(from, to) {
  if (from === to) { // we have reached the first number
    return [from];
  } else {
    return rangeFunc(from, (to - 1)).concat([to]); // always append the current number to the existing array
  }
};

Array.prototype.range = function(from, to) {
  return rangeFunc(from, to);
};

Array.prototype.sum = function() {
  var arraySum = 0;
  this.forEach(function(currentValue) {
    arraySum += currentValue;
  });
  return arraySum;
};

Array.prototype.average = function() {
  var arraySum = this.sum();
  return arraySum / this.length;
};

Number.prototype.times = function(action) {
  var i;
  for (i = 0; i < this; i++) {
    action();
  }
};
