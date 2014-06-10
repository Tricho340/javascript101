"use strict";

function Point(x, y) {
  this.xInc = function() {
    x++;
  };

  this.xDec = function() {
    x--;
  };

  this.yInc = function() {
    y++;
  };

  this.yDec = function() {
    y--;
  };

  this.getX = function() {
    return x;
  };

  this.getY = function() {
    return y;
  };
}

Point.prototype.equals = function(point) {
  return ((point.getX() === this.getX()) && (point.getY() === this.getY()));
};

Point.prototype.toString = function() {
  return "Point @ " +this.getX() + ", " + this.getY();
};

exports.Point = Point;
