"use strict";

exports.pairExerciseTest = function(test) {
  var Pair = require("./a_pair_or_two.js").Pair;
  var testPair = new Pair(4, 6);
  var expectedResult = 10;
  var actualResult = testPair.combine(function(left, right) {
    return left + right;
  });
  test.equal(actualResult, expectedResult);
  test.done();
};

exports.stringUppercaseExerciseTest = function(test) {
  var testString = "javascript";
  require("./extending_prototypes.js");
  var actualResult = testString.capitalize();
  var expectedResult = "JAVASCRIPT";
  test.equal(actualResult, expectedResult);
  test.done();
};

exports.stringDasherizeExerciseTest = function(test) {
  var testString = "border_width_bottom";
  require("./extending_prototypes.js");
  var actualResult = testString.dasherize();
  var expectedResult = "border-width-bottom";
  test.equal(actualResult, expectedResult);
  test.done();
};

exports.stringTimesExerciseTest = function(test) {
  var testString = "bobi";
  require("./extending_prototypes.js");
  var actualResult = testString.times(5);
  var expectedResult = "bobi bobi bobi bobi bobi";
  test.equal(actualResult, expectedResult);
  test.done();
};

exports.stringBlankExerciseTest = function(test) {
  require("./extending_prototypes.js");
  var testString1 = "";
  var actualResult1 = testString1.blank();
  var expectedResult1 = true;
  test.equal(actualResult1, expectedResult1);

  var testString2 = " ";
  var actualResult2 = testString2.blank();
  var expectedResult2 = true;
  test.equal(actualResult2, expectedResult2);

  var testString3 = " a";
  var actualResult3 = testString3.blank();
  var expectedResult3 = false;
  test.equal(actualResult3, expectedResult3);

  test.done();
};

exports.arrayFirstExerciseTestWorking = function(test) {
  require("./extending_prototypes.js");
  var testArray = [0, 1, 2, 3];
  var actualResult = testArray.first();
  var expectedResult = 0;
  test.equal(actualResult, expectedResult);

  test.done();
};

exports.arrayFirstExerciseTestException = function(test) {
  require("./extending_prototypes.js");
  var testArray = [];
  test.throws(function() {
    testArray.first();
  });
  test.done();
};

exports.arrayRangeExerciseTest = function(test) {
  require("./extending_prototypes.js");
  var actualResult = [].range(1, 10);
  var expectedResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  test.deepEqual(actualResult, expectedResult);

  test.done();
};

exports.arraySumExerciseTest = function(test) {
  require("./extending_prototypes.js");

  var actualResult = [1, 1].sum();
  var expectedResult = 2;
  test.deepEqual(actualResult, expectedResult);

  test.done();
};

exports.arrayAverageExerciseTest = function(test) {
  require("./extending_prototypes.js");

  var actualResult = [1, 1].average();
  var expectedResult = 1;
  test.deepEqual(actualResult, expectedResult);

  test.done();
};

exports.numberExerciseFunctionTest = function(test) {
  require("./extending_prototypes.js");
  var actualResult = "";
  (5).times(function() {
    actualResult += "bla";
  });
  var expectedResult = "blablablablabla";
  test.equal(actualResult, expectedResult);

  test.done();
};

exports.pointEqualsExerciseTestFalse = function(test) {
  var Point = require("./point_in_the_sky.js").Point;
  var point1 = new Point(1, 1);
  var point2 = new Point(1, 2);
  test.equal(point1.equals(point2), false);

  point1 = new Point(1, 1);
  point2 = new Point(1, 1);
  test.equal(point1.equals(point2), true);

  test.done();
};

exports.pointToStringExerciseTest = function(test) {
  var Point = require("./point_in_the_sky.js").Point;
  var testPoint = new Point(1, 1);
  var actualResult = testPoint.toString();
  var expectedResult = "Point @ 1, 1";
  test.equal(actualResult, expectedResult);

  test.done();
};

exports.robotExerciseTest = function(test) {
  var Point = require("./point_in_the_sky.js").Point;
  var Robot = require("./robot.js").Robot;
  var robot = new Robot(new Point(0, 0));

  robot.moveLeft(10);
  robot.moveDown(5);

  var actualResult = robot.getPosition().toString();
  var expectedResult = "Point @ -10, 5";
  test.equal(actualResult, expectedResult);
  test.done();
};

exports.pizzaExerciseTest = function() {
};
