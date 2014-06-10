"use strict";

function Pair(left, right) {
  this.left = left;
  this.right = right;
}

Pair.prototype.equals = function(pair) {
  return ((pair.left === this.left) && (pair.right === this.right));
};

Pair.prototype.toString = function() {
  return "(" + this.left + ", " + this.right + ")";
};

Pair.prototype.toList = function() {
  return [this.left, this.right];
};

Pair.prototype.combine = function(specificFunction) {
  return specificFunction(this.left, this.right);
};

exports.Pair = Pair;
