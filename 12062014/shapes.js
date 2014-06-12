"use strict";

function Shape(type) {
  this.type = type;
  this.getType = function() {
    return this.type;
  };
}

Shape.prototype.area = function() {

};

function Triangle(base, height) {
  Shape.call(this, "triangle");
  this.base = base;
  this.triangleHeight = height;
}

Triangle.prototype = Object.create(Shape.prototype);

Triangle.prototype.area = function() {
  console.log("Area of triangle goes here");
  return (this.base * this.triangleHeight) / 2;
};

function Circle(radius) {
  Shape.call(this, "circle");
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);

Circle.prototype.area = function() {
  console.log("Area of circle goes here");
  return Math.PI * this.radius * this.radius;
};

function Rectangle(width, height) {
  Shape.call(this, "rectangle");
  this.width = width;
  this.height = height;
}

Rectangle.prototype = Object.create(Shape.prototype);

Rectangle.prototype.area = function() {
  console.log("Area of rectangle goes here");
  return this.width * this.height;
};
